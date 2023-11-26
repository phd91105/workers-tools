import type { ContextWithBody } from 'cloudworker-router';
import { Utils } from 'discord-api-types/v10';

import type { Env } from '@/factory/types';

import { cherryPick } from './commands/cherryPick';

export const discord = async (context: ContextWithBody<Env>) => {
  if (Utils.isApplicationCommandGuildInteraction(context.body)) {
    switch (context.body.data.name.toLowerCase()) {
      case 'pick': {
        return await cherryPick(context);
      }
    }
  }
};
