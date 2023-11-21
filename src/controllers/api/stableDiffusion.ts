import { Ai } from '@cloudflare/ai';
import { ContextWithBody, Next } from 'cloudworker-router';

import { Env } from '@/factory/types';
import { Base64Utils, removeDiacritics } from '@/utils';

export async function genImage(context: ContextWithBody<Env>, next: Next) {
  try {
    const ai = new Ai(context.env.AI);
    const data = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
      prompt: context.body.prompt,
    });

    const dataBase64 = Base64Utils.bufferToBase64(data);
    const fileName = `/${removeDiacritics(context.body.prompt)}_gen.png`;

    await context.env.FILE.put(fileName, dataBase64, {
      metadata: {
        fileName,
        contentType: 'image/png',
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
