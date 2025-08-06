import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-tour-app',
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
  env: process.env.NODE_ENV || 'development',
  uploadPath: path.join(__dirname, '../uploads'),
  maxFileSize: 5 * 1024 * 1024 // 5MB
};  