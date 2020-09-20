import { Role } from '../entity/Role';
import { MessageEmbed, EmbedField } from 'discord.js';

export const createEmbed = (roles: Role[]): MessageEmbed => {
  const roleFields: EmbedField[] = [];

  roles.forEach((role, index) => {
    const counter = index + 1;
    roleFields.push({
      name: `${counter}: ${role.name}`,
      value: role.emoji,
      inline: false,
    });
  });

  return new MessageEmbed({
    author: {
      name: 'Role Meister',
    },
    title: roles.length > 0 ? 'Active roles' : 'Currently no active roles',
    description: roles.length > 0 ? '' : 'No roles exist yet',
    fields: roleFields,
    timestamp: new Date(),
    color: 16722253,
  });
};
