import jwt from 'jsonwebtoken';
import { unauthenticated } from '../utils/customeError.util.js';
export const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unauthenticated('No token provided');
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; 
    next();
  } catch (error) {
    throw new unauthenticated("Invalid or expired token");
  }
};
