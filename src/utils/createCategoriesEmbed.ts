import { Category } from '../entity/Category';
import { MessageEmbed, EmbedField } from 'discord.js';

export const createEmbed = (categories: Category[]): MessageEmbed => {
  const categoryFields: EmbedField[] = [];

  categories.forEach((category, index) => {
    const counter = index + 1;
    categoryFields.push({
      name: `${counter}: ${category.slug}`,
      value: category.message,
      inline: false,
    });
  });

  return new MessageEmbed({
    author: {
      name: 'Role Meister',
    },
    title:
      categories.length > 0
        ? 'Active categories'
        : 'Currently no active categories',
    description: categories.length > 0 ? '' : 'No categories exist yet',
    fields: categoryFields,
    timestamp: new Date(),
    color: 16722253,
  });
};
