import { Ai } from '@cloudflare/ai';
import type { ContextWithBody, Next } from 'cloudworker-router';

import type { Env } from '@/factory/types';
import { Base64Utils, removeDiacritics } from '@/utils';

export async function genImage(context: ContextWithBody<Env>, next: Next) {
  try {
    const ai = new Ai(context.env.AI);
    const fileName = `/${removeDiacritics(context.body.prompt)}_gen.png`;

    context.event.waitUntil(
      (async () => {
        const data = await ai.run(
          '@cf/stabilityai/stable-diffusion-xl-base-1.0',
          {
            prompt: context.body.prompt,
          },
        );

        const dataBase64 = Base64Utils.bufferToBase64(data);
        await context.env.FILE.put(fileName, dataBase64, {
          metadata: {
            fileName,
            contentType: 'image/png',
          },
        });
      })(),
    );

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
