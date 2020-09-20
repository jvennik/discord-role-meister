import createGuild from '../utils/createGuild';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';
import { Role } from '../entity/Role';

export enum CREATE_ROLE_RESULT {
  SUCCESS,
  CATEGORY_NOT_FOUND,
  EMOJI_NOT_FOUND,
  DUPLICATE,
}

export const createRole = async ({
  guildId,
  category,
  name,
  emoji,
}: {
  guildId: string;
  category: string;
  name: string;
  emoji: string;
}): Promise<CREATE_ROLE_RESULT> => {
  try {
    await createGuild({ guildId });

    const categoryRepository = getRepository(Category);
    const foundCategory = await categoryRepository.findOne({
      where: {
        guildId,
        slug: category,
      },
    });

    if (!foundCategory) {
      return CREATE_ROLE_RESULT.CATEGORY_NOT_FOUND;
    }

    if (!emoji) {
      return CREATE_ROLE_RESULT.EMOJI_NOT_FOUND;
    }

    const RoleRepository = getRepository(Role);
    const roleExists = await RoleRepository.findOne({
      where: {
        guildId,
        attachedCategory: foundCategory,
        name,
      },
    });

    if (roleExists) {
      return CREATE_ROLE_RESULT.DUPLICATE;
    }

    const role = new Role({
      guildId,
      attachedCategory: foundCategory,
      name,
      emoji,
    });
    await RoleRepository.save(role);

    return CREATE_ROLE_RESULT.SUCCESS;
  } catch (e) {
    throw e;
  }
};
