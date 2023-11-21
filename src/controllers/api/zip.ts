import { ContextWithBody, Next } from 'cloudworker-router';

import { zipServices } from '@/services';
import { Env } from '@/types';
import { Base64Utils, getCurrentDateTime } from '@/utils';

export async function getZipped(context: ContextWithBody<Env>, next: Next) {
  try {
    const fileName = `/zip/data_${getCurrentDateTime()}.zip`;

    const data = await zipServices.getZipped(context.body);
    const dataBase64 = Base64Utils.bufferToBase64(data);

    await context.env.FILE.put(fileName, dataBase64, {
      metadata: {
        fileName: fileName,
        contentType: 'application/zip',
      },
    });
    const { protocol, host } = context;

    const response = {
      url: `${protocol}//${host}${fileName}`,
    };

    return Response.json(response, {
      headers: context.headers,
    });
  } catch (error) {
    context.state.error = error;

    return next();
  }
}
