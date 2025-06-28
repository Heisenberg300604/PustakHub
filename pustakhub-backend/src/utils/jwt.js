import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export function generateToken(userId) {
  return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  return jwt.verify(token, ENV.JWT_SECRET);
}
