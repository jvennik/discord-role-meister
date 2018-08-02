const config = require('config');

export const isMod =
async function isMod(msg) {
  let hasRole = false;
  if (msg.member) {
    config.authorizedRoles.forEach(roleName => {
      const role = msg.guild.roles.find('name', roleName);
      if (msg.member.roles.has(role)) {
        hasRole = true;
      }
    });
  }
  return hasRole;
};

export default isMod;
