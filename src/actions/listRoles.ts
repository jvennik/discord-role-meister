import createGuild from '../utils/createGuild';
import { getRepository } from 'typeorm';
import { Role } from '../entity/Role';

export const listRoles = async ({
  guildId,
}: {
  guildId: string;
}): Promise<Role[]> => {
  await createGuild({ guildId });

  const roleRepository = getRepository(Role);
  const roles = roleRepository.find({
    where: { guildId },
  });

  return roles;
};
