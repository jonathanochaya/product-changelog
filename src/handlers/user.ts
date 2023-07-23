import { Request, Response, NextFunction } from "express";
import prisma from "../modules/db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";


export const createNewUser = async (req: Request, res: Response) => {

  const { username, password }: 
    { username: string; password: string} = req.body;

  const user = await prisma.user.create({
    data: {
      username: username,
      password: await hashPassword(password)
    }
  });

  const token = createJWT(user);

  res.json({ token })
}


export const signIn = async (req: Request, res: Response) => {
  const { username }: { username: string } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });


  if(user) {
    const { password }: { password: string } = req.body;

    const isValid = await comparePassword(password, user.password)
  
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