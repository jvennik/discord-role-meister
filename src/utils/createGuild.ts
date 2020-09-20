import { getRepository } from 'typeorm';
import { Guild } from '../entity/Guild';

export const createGuild = async function createGuild({
  guildId,
}: {
  guildId: string;
}): Promise<Guild> {
  try {
    const guildRepository = getRepository(Guild);
    let guild = await guildRepository.findOne({
      where: { guildId },
    });

    if (!guild) {
      guild = new Guild({
        guildId,
      });
      await guildRepository.save(guild);
    }

    return guild;
  } catch (e) {
    throw e;
  }
};

export default createGuild;
