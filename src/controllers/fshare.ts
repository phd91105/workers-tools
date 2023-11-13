import fsharePage from '../../views/fshare/index.html';
import { HttpStatus } from '../enums';

/**
 * Render the FShare index page.
 */
export const index = async () => {
  return new Response(fsharePage, {
    status: HttpStatus.OK,
    headers: {
      'content-type': 'text/html',
    },
  });
};
