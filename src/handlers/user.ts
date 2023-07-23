import { Request, Response, NextFunction } from "express";
import prisma from "../modules/db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";


export const createNewUser = async (req: Request, res: Response) => {

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password)
    }
  });

  const token = createJWT(user);

  res.json({ token })
}


export const signIn = async (req: Request, res: Response) => {

  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  });


  if(user) {
    const isValid = await comparePassword(req.body.password, user.password)
  
    if(!isValid) {
      res.status(401).json({ message: 'Invalid Username or Password' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Invalid Username or Password' });
    return;
  }
  
  const token = createJWT(user);
  res.json({ token })
}