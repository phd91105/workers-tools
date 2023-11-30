import map from 'lodash/map';

import { truncate2byte } from './string';

export function createEmbed(
  title: string,
  commit: {
    task: string;
    message: string;
    committer: string;
    sha: string;
  }[],
  from: string,
  to: string,
  color?: number,
) {
  const listMsg = map(
    commit,
    (item) =>
      `[2;36m${item.message.match(/#\d+/)![0].trim()}[0m ` +
      truncate2byte(
        `${item.message
          .replace(/refs\s/g, '')
          .replace(/#\d+/g, '')
          .replace(/^\s+-/g, '')
          .trim()}`,
        20,
      ),
  ).join('\n');

  const listCommitter = map(
    commit,
    (item) => `[2;33m${item.committer}[0m`,
  ).join('\n');
  const listSHA = map(commit, (item) => `[2;34m${item.sha}[0m`).join('\n');

  const embed = {
    title,
    fields: [
      {
        name: 'Ticket            Commit message',
        value: '```ansi\n' + listMsg + '\n```',
        inline: true,
      },
      {
        name: 'Author',
        value: '```ansi\n' + listCommitter + '\n```',
        inline: true,
      },
      {
        name: 'SHA',
        value: '```ansi\n' + listSHA + '\n```',
        inline: true,
      },
    ],
    footer: {
      text: `Commits from ${from.split('T')[0].replaceAll('-', '/')} to ${to
        .split('T')[0]
        .replaceAll('-', '/')}`,
    },
    color,
  };

  const cmd = {
    fields: [
      {
        name: 'Command',
        value:
          '```\n' +
          'git cherry-pick ' +
          map(commit, 'sha').reverse().join(' ') +
          '\n```',
        inline: true,
      },
    ],
    color,
  };

  return [embed, cmd];
}
