interface Config {
  general: {
    commandPrefix: string;
    botToken?: string;
    ownerId?: string;
    botUsername: string;
  };
  authorizedRoles: string[];
}

const loadAuthorizedRoles = (): string[] => {
  const envRoles = process.env.AUTHORIZED_ROLES;
  const loadedRoles = envRoles?.split(',') ?? ['Admin', 'Mod'];

  return loadedRoles;
};

const config: Config = {
  general: {
    commandPrefix: process.env.BOT_COMMAND_PREFIX ?? '!roles',
    botToken: process.env.BOT_TOKEN,
    botUsername: process.env.BOT_USERNAME ?? 'RoleMeister',
    ownerId: process.env.BOT_OWNER_ID,
  },
  authorizedRoles: loadAuthorizedRoles(),
};

export default config;
