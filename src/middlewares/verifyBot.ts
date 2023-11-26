import type { ContextWithBody, Next } from 'cloudworker-router';
import {
  InteractionResponseType,
  InteractionType,
} from 'discord-api-types/v10';

import type { Env } from '@/factory/types';

export async function verifyDiscordRequest(
  context: ContextWithBody<Env>,
  next: Next,
) {
  if (context.body.type === InteractionType.Ping) {
    return Response.json({
      type: InteractionResponseType.Pong,
    });
  }

  return next();
}
