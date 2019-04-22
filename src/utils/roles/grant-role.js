export const grantRole =
async function grantRole(msg, role, user) {
  const roleObj = msg.guild.roles.find('name', role);
  const member = msg.guild.member(user.id);
  if (member) {
    member.addRole(roleObj).catch(() => null);
  }
};

export default grantRole;
