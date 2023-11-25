/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContextWithBody } from 'cloudworker-router';
import { InteractionResponseType } from 'discord-interactions';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import map from 'lodash/map';
import Papa from 'papaparse';

import { commonHeaders, githubUrl } from '@/contants';
import { Env } from '@/factory/types';
import { constructURLWithParams, createEmbed, requestApi } from '@/utils';

export function filterCommit(listIssue: any, data: any) {
  const filtered = filter(data, (item) => {
    const issue = item.commit?.message.match(/#\d+/);

    return (
      item.committer?.login != 'web-flow' &&
      issue &&
      includes(listIssue, issue[0].replace(/#/, ''))
    );
  });

  const listCommit = map(filtered, (item) => {
    const task = item.commit?.message.match(/#\d+/)[0].replace(/#/, '');
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
}

export const getCsvData = async (fileUrl: string) => {
  const response = await fetch(fileUrl);
  const data = await response.text();

  const parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });

  return parsedData;
};

export const getCommitData = async (
  context: ContextWithBody<Env>,
  repo: string,
) => {
  const url = constructURLWithParams(githubUrl(context.env.OWNER, repo), {
    sha: 'develop',
    per_page: 100,
  });

  const data = await requestApi(url, {
    headers: {
      ...context.headers,
      ...commonHeaders(),
      Authorization: `Bearer ${context.env.GIT_TOKEN}`,
    },
  });

  return data;
};

export const cherryPick = async (context: ContextWithBody<Env>) => {
  const targetFile = context.body.data?.options[0]?.value;
  const fileUrl = context.body.data?.resolved?.attachments[targetFile]?.url;

  const { data } = await getCsvData(fileUrl);

  const listIssue = map(data, '#');

  const [api, front, batch] = await Promise.all([
    getCommitData(context, context.env.API_REPO),
    getCommitData(context, context.env.FRONT_REPO),
    getCommitData(context, context.env.BATCH_REPO),
  ]);

  const commitAPI = filterCommit(listIssue, api);
  const commitFront = filterCommit(listIssue, front);
  const commitBatch = filterCommit(listIssue, batch);

  const embedList = [];

  if (commitAPI.length) {
    embedList.push(createEmbed(context.env.API_REPO, commitAPI, 15548997));
  }

  if (commitFront.length) {
    embedList.push(createEmbed(context.env.FRONT_REPO, commitFront, 2800796));
  }

  if (commitBatch.length) {
    embedList.push(createEmbed(context.env.BATCH_REPO, commitBatch, 16705372));
  }

  return Response.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: null,
      embeds: embedList,
    },
  });
};
