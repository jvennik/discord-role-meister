const config = require('config');

export const isMod =
async function isMod(msg) {
  let hasRole = false;
  config.authorizedRoles.forEach(roleName => {
    const role = msg.guild.roles.find('name', roleName);
    if (msg.member && msg.member.roles.has(role)) {
      hasRole = true;
    }
  });
  return hasRole;
};

export default isMod;
