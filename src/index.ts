import { createConnection } from 'typeorm';
import { bot } from './bot/BotController';

// Setup Discord Bot
bot.connect();

// Setup DB connection
createConnection();
