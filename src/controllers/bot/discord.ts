import { ContextWithBody } from 'cloudworker-router';
import { InteractionType } from 'discord-interactions';

import { Env } from '@/factory/types';

import { cherryPick } from './modules/cherryPick';

export const discord = async (context: ContextWithBody<Env>) => {
  if (context.body.type === InteractionType.APPLICATION_COMMAND) {
    switch (context.body.data.name.toLowerCase()) {
      case 'pick': {
        return await cherryPick(context);
      }
    }
  }
};
