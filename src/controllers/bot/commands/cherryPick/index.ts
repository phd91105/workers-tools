import type { ContextWithBody } from 'cloudworker-router';
import { InteractionResponseType } from 'discord-api-types/v10';
import compact from 'lodash/compact';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import split from 'lodash/split';
import trim from 'lodash/trim';

import type { Env } from '@/factory/types';
import { createEmbed, findMinMaxDates } from '@/utils';

import { getCommitsDataForRepos, getCsvData } from './helpers';

export const cherryPick = async (context: ContextWithBody<Env>) => {
  const targetFile = context.body.data?.options[0]?.value;
  const fileUrl = context.body.data?.resolved?.attachments[targetFile]?.url;

  const { data } = await getCsvData(fileUrl);

  const listIssue = map(data, '#');
  const listDate = flatMap(data, (o) => [o.Created, o.Updated]);
  const minMaxDate = findMinMaxDates(listDate);

  const repos = map(split(context.env.REPOS, ','), trim);

  const commitsData = await getCommitsDataForRepos(
    context,
    repos,
    minMaxDate,
    listIssue,
  );

  const embedList = flatMap(
    compact(
      map(commitsData, (commitData) => {
        if (!isNil(commitData) && !isEmpty(commitData.commits)) {
          return createEmbed(
            commitData.repo,
            commitData.commits,
            commitData.from,
            commitData.to,
            commitData.color,
          );
        }
      }),
    ),
  );

  return Response.json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: null,
      embeds: embedList,
    },
  });
};
