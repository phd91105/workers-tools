import fsharePage from '../../views/fshare/index.min.html';
import { HttpStatus } from '../enums';

export const index = async () => {
  return new Response(fsharePage, {
    status: HttpStatus.OK,
    headers: {
      'content-type': 'text/html',
    },
  });
};
