import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
  port: process.env.PORT,
  dbURI: process.env.DB_URI,
  secret: process.env.SECRET,
  saltRounds: parseInt(process.env.SALT_ROUNDS as string),
};
