import createGuild from '../utils/createGuild';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

export const listCategories = async ({
  guildId,
}: {
  guildId: string;
}): Promise<Category[]> => {
  await createGuild({ guildId });

  const categoryRepository = getRepository(Category);
  const categories = categoryRepository.find({
    where: { guildId },
  });

  return categories;
};
