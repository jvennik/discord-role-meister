export const revokeRole =
async function revokeRole(msg, role, user) {
  const roleObj = msg.guild.roles.find('name', role);
  const member = msg.guild.member(user.id);
  member.removeRole(roleObj).catch(() => null);
};

export default revokeRole;
