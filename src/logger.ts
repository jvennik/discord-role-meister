import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  transports: [new winston.transports.Console()],
});

export default logger;
