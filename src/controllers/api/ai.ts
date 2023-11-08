import { Ai } from '@cloudflare/ai';
import { Env } from '../../interfaces';

export function AiApiController() {
  const chat = async (request: Request, env: Env) => {
    const body: { message: string } = await new Response(request.body).json();
    const ai = new Ai(env.AI);

    let chat = {
      messages: [{ role: 'user', content: body.message }],
    };
    const response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', chat);

    return Response.json(response);
  };

  return {
    chat,
  };
}
