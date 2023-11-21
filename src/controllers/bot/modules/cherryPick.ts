import filter from 'lodash/filter';
import includes from 'lodash/includes';
import map from 'lodash/map';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterCommit(listIssue: any, data: any) {
  // console.log(data);

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
