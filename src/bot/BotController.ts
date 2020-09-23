import { CommandoClient } from 'discord.js-commando';
import { Guild } from 'discord.js';
import config from '../config';
import logger from '../logger';
import { Commands } from './commands';
import { rebind } from '../utils/rebind';

export class BotController {
  public client = new CommandoClient({
    commandPrefix: config.general.commandPrefix,
    owner: config.general.ownerId,
  });

  public connect = (): void => {
    this.client.registry
      .registerDefaultTypes()
      .registerGroups([['admin', 'Admin Commands']])
      .registerDefaultGroups()
      .registerDefaultCommands({
        eval: false,
        commandState: false,
        ping: false,
        prefix: false,
      })
      .registerCommands(Commands);

    this.client.login(config.general.botToken);

    this.client.on('ready', () => {
      logger.info('Welcome to Role Meister');
      logger.info('Connected to Discord');

      if (this.client.user) {
        this.client.user.setUsername(config.general.botUsername);
        this.client.user.setPresence({
          activity: { name: '!roles help' },
        });
      }

      const guilds = this.client.guilds.cache.map((guild: Guild) => guild);

      guilds.forEach(async (guild: Guild) => {
        rebind({ guild: guild });
      });
    });

    this.client.on('error', (error: { message: any }) => {
      logger.error(`Something went wrong. Reason: ${error.message}`);
    });
  };
}

export const bot = new BotController();

export default BotController;
