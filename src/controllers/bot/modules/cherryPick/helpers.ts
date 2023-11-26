import { ContextWithBody } from 'cloudworker-router';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import map from 'lodash/map';
import Papa from 'papaparse';

import { commonHeaders, githubUrl } from '@/constants';
import { CommitArray, Env } from '@/factory/types';
import { constructURLWithParams, requestApi } from '@/utils';

export const getCsvData = async (fileUrl: string) => {
  const data = await requestApi<string>(fileUrl, undefined, 'text');

  const parsedData = Papa.parse<{
    '#': string;
    Created: string;
    Updated: string;
  }>(data, {
    header: true,
    skipEmptyLines: true,
  });

  return parsedData;
};

export const filterCommit = (listIssue: string[], data: CommitArray) => {
  const filtered = filter(data, (item) => {
    const issue = item.commit?.message.match(/#\d+/);

    return (
      item.committer?.login !== 'web-flow' &&
      issue &&
      includes(listIssue, issue[0].replace(/#/, ''))
    );
  }) as CommitArray;

  const listCommit = map(filtered, (item) => {
    const task = item.commit?.message.match(/#\d+/)![0].replace(/#/, '');
    const message = item.commit?.message;
    const committer = item.committer?.login;
    const sha = item.sha.substring(0, 7);
    return {
      task,
      message,
      committer,
      sha,
    };
  });

  return listCommit;
};

export const getCommitData = async (
  context: ContextWithBody<Env>,
  repo: string,
  date: { minDate: string; maxDate: string },
) => {
  const allData = [];
  let page = 1;
  let hasMoreData = true;
  const perPage = 100;

  while (hasMoreData) {
    const url = constructURLWithParams(githubUrl(context.env.OWNER, repo), {
      sha: 'develop',
      since: date.minDate,
      until: date.maxDate,
      per_page: perPage,
      page: page,
    });

    const data = await requestApi<CommitArray>(url, {
      headers: {
        ...context.headers,
        ...commonHeaders(),
        Authorization: `Bearer ${context.env.GIT_TOKEN}`,
      },
    });

    allData.push(...data);

    hasMoreData = data.length === perPage;
    page++;
  }

  return allData;
};

export const getCommitsDataForRepos = async (
  context: ContextWithBody<Env>,
  repos: string[],
  minMaxDate: { minDate: string; maxDate: string },
  listIssue: string[],
) => {
  const colors = [15548997, 2800796, 16705372];
  const commitDataPromises = repos.map(async (repo, index) => {
    try {
      const commitData = await getCommitData(context, repo, minMaxDate);
      return {
        repo,
        commits: filterCommit(listIssue, commitData),
        color: colors[index],
        from: minMaxDate.minDate,
        to: minMaxDate.maxDate,
      };
    } catch (error) {
      return null;
    }
  });

  return Promise.all(commitDataPromises);
};
