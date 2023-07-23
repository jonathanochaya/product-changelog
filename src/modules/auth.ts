import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secret = process.env.JWT_SECRET || '';

export const createJWT = (user: { id: String, username: String}) => {
  const token = jwt.sign({
    id: user.id,
    username:  user.username
  }, secret);

  return token;
}


export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if(!bearer) {
    res.status(401);
    res.json({message: "Not Authorized!"});
    return;
  }

  const [, token] = bearer.split(' ');
  if(!token) {
    res.status(401);
    res.json({message: "Not Authorized!"});
    return;
  }

  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (e) {
    console.error(e)
    res.status(401);
    res.json({message: "Invalid Token!"});
    return;
  }
}

export const comparePassword = (password: string | Buffer, hash: string) => {
  return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string | Buffer) => {
  return bcrypt.hash(password, 10);
}