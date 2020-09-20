import createGuild from '../utils/createGuild';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

export enum CREATE_CAT_RESULT {
  SUCCESS,
  DUPLICATE,
}

export const createCategory = async ({
  guildId,
  slug,
  message,
}: {
  guildId: string;
  slug: string;
  message: string;
}): Promise<CREATE_CAT_RESULT> => {
  try {
    await createGuild({ guildId });

    const categoryRepository = getRepository(Category);
    const exists = await categoryRepository.findOne({
      where: {
        guildId,
        slug,
      },
    });

    if (exists) {
      return CREATE_CAT_RESULT.DUPLICATE;
    }

    const category = new Category({
      guildId,
      slug,
      message,
    });
    await categoryRepository.save(category);

    return CREATE_CAT_RESULT.SUCCESS;
  } catch (e) {
    throw e;
  }
};
