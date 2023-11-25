import { ContextWithBody, Next } from 'cloudworker-router';
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';

import { HttpStatus } from '@/factory/enums';
import { Env } from '@/factory/types';

export async function verifyDiscordRequest(
  context: ContextWithBody<Env>,
  next: Next,
) {
  const signature = context.request.headers.get('x-signature-ed25519');
  const timestamp = context.request.headers.get('x-signature-timestamp');

  const isValidRequest =
    signature &&
    timestamp &&
    verifyKey(
      JSON.stringify(context.body),
      signature,
      timestamp,
      context.env.DISCORD_PUBLIC_KEY,
    );

  if (!isValidRequest) {
    return Response.json(
      { error: 'Bad request signature.' },
      { status: HttpStatus.UNAUTHORIZED },
    );
  }

  if (context.body.type === InteractionType.PING) {
    return Response.json({
      type: InteractionResponseType.PONG,
    });
  }

  return next();
}
