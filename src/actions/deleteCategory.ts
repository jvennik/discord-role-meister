import createGuild from '../utils/createGuild';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

export enum DELETE_CAT_RESULT {
  SUCCESS,
  DOES_NOT_EXIST,
}

export const deleteCategory = async ({
  guildId,
  slug,
}: {
  guildId: string;
  slug: string;
}): Promise<DELETE_CAT_RESULT> => {
  try {
    await createGuild({ guildId });

    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne({
      where: {
        guildId,
        slug,
      },
    });

    if (category) {
      await categoryRepository.delete(category);
      return DELETE_CAT_RESULT.SUCCESS;
    } else {
      return DELETE_CAT_RESULT.DOES_NOT_EXIST;
    }
  } catch (e) {
    return DELETE_CAT_RESULT.DOES_NOT_EXIST;
  }
};
