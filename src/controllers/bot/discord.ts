import { Context } from 'cloudworker-router';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import Papa from 'papaparse';

import { commonHeaders, githubUrl } from '@/contants';
import { Env } from '@/factory/types';
import {
  constructURLWithParams,
  handleApiRequest,
  verifyDiscordRequest,
} from '@/utils';

import { filterCommit } from './modules/cherryPick';

export const discord = async (context: Context<Env>) => {
  const { isValid, interaction } = await verifyDiscordRequest(context);
  if (!isValid || !interaction) {
    return Response.json({ error: 'Bad request signature.' }, { status: 401 });
  }

  if (interaction.type === InteractionType.PING) {
    return Response.json({
      type: InteractionResponseType.PONG,
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    switch (interaction.data.name.toLowerCase()) {
      case 'pick': {
        const targetFile = interaction.data?.options[0]?.value;
        const fileUrl =
          interaction.data?.resolved?.attachments[targetFile]?.url;

        const { data } = await getCsvData(fileUrl);

        const listIssue = map(data, '#');

        const [api, front, batch] = await Promise.all([
          getCommitData(context, context.env.API_REPO),
          getCommitData(context, context.env.FRONT_REPO),
          getCommitData(context, context.env.BATCH_REPO),
        ]);

        const lstCmd: string[] = [];

        if (!isEmpty(filterCommit(listIssue, api))) {
          lstCmd.push(
            context.env.API_REPO +
              '\n```git cherry-pick ' +
              map(filterCommit(listIssue, api), 'sha').reverse().join(' ') +
              '```',
          );
        }
        if (!isEmpty(filterCommit(listIssue, front))) {
          lstCmd.push(
            context.env.FRONT_REPO +
              '\n```git cherry-pick ' +
              map(filterCommit(listIssue, front), 'sha').reverse().join(' ') +
              '```',
          );
        }
        if (!isEmpty(filterCommit(listIssue, batch))) {
          lstCmd.push(
            context.env.BATCH_REPO +
              '\n```git cherry-pick ' +
              map(filterCommit(listIssue, batch), 'sha').reverse().join(' ') +
              '```',
          );
        }

        const msg = lstCmd.join('\n');

        return Response.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: msg,
          },
        });
      }
    }
  }

  throw new Error('BAD_REQUEST');
};

export const getCsvData = async (fileUrl: string) => {
  const response = await fetch(fileUrl);
  const data = await response.text();

  const parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });

  return parsedData;
};

export const getCommitData = async (context: Context<Env>, repo: string) => {
  const url = constructURLWithParams(githubUrl(context.env.OWNER, repo), {
    sha: 'develop',
    per_page: 100,
  });

  const data = await handleApiRequest(
    fetch(url, {
      headers: {
        ...context.headers,
        ...commonHeaders(),
        Authorization: `Bearer ${context.env.GIT_TOKEN}`,
      },
    }),
  );

  return data;
};
