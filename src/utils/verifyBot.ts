import { ContextWithBody } from 'cloudworker-router';
import { verifyKey } from 'discord-interactions';

import { Env } from '@/factory/types';

export async function verifyDiscordRequest(context: ContextWithBody<Env>) {
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
    return { isValid: false };
  }

  return { interaction: context.body, isValid: true };
}
