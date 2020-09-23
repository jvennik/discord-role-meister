import createGuild from '../utils/createGuild';
import { getRepository } from 'typeorm';
import { Role } from '../entity/Role';

export enum DELETE_ROLE_RESULT {
  SUCCESS,
  DOES_NOT_EXIST,
}

export const deleteRole = async ({
  guildId,
  name,
}: {
  guildId: string;
  name: string;
}): Promise<DELETE_ROLE_RESULT> => {
  try {
    await createGuild({ guildId });

    const roleRepository = getRepository(Role);

    const role = await roleRepository.findOne({
      where: {
        guildId,
        name,
      },
    });

    if (role) {
      await roleRepository.delete(role);
      return DELETE_ROLE_RESULT.SUCCESS;
    } else {
      return DELETE_ROLE_RESULT.DOES_NOT_EXIST;
    }
  } catch (e) {
    return DELETE_ROLE_RESULT.DOES_NOT_EXIST;
  }
};
