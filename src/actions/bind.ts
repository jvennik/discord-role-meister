import createGuild from '../utils/createGuild';
import { getRepository } from 'typeorm';
import { Guild } from '../entity/Guild';

export enum BIND_RESULT {
  SUCCESS,
  ALREADY_BOUND,
}

export const bindToChannel = async ({
  guildId,
  channelId,
}: {
  guildId: string;
  channelId: string;
}): Promise<BIND_RESULT> => {
  try {
    const guildRepository = getRepository(Guild);
    // Create a guild in our database if one does not already exist
    const guild = await createGuild({ guildId });

    if (guild.boundChannelId === channelId) {
      return BIND_RESULT.ALREADY_BOUND;
    }

    guild.boundChannelId = channelId;
    await guildRepository.save(guild);
    return BIND_RESULT.SUCCESS;
  } catch (e) {
    throw e;
  }
};
