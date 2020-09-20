import { GuildMember, Role, Message } from 'discord.js';
import { getRepository } from 'typeorm';
import { Role as DBRole } from '../entity/Role';

const isEmoji = (input: string) =>
  (
    input.match(
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
    ) || ''
  ).length ==
  input.length / 2;

export const revokeRole = async function revokeRole({
  msg,
  role,
  member,
}: {
  msg: Message;
  role: string;
  member: GuildMember;
}): Promise<boolean> {
  try {
    if (isEmoji(role)) {
      // Found a standard emoji, do a reverse lookup
      const roleRepository = getRepository(DBRole);
      const fetchedRole = await roleRepository.findOne({
        where: {
          guildId: msg.guild?.id,
          emoji: role,
        },
      });
      if (fetchedRole) {
        role = fetchedRole.name;
      }
    }

    const user = msg.guild?.member(member.id);
    const roleObj = msg.guild?.roles.cache.find(
      (item: Role) => item.name === role
    );

    if (member && user && roleObj) {
      user.roles.remove(roleObj);
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default revokeRole;
