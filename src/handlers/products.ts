import { Request, Response } from 'express';
import prisma from '../modules/db';


// Get all products
export const getProducts = async (req: Request, res: Response) => {
  if (req.user && req.user.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      include: {
        products: true
      }
    })

    if(user)
      res.json({ data: user.products })
    else
      res.status(401).json({ data: [], message: "Authorization Error!" });
  }

  res.status(401).json({ data: [], message: "Authorization Failed!"});
}


// Get one product
export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id

  if(req.user) {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
        belongsToId: req.user.id
      }
    });

    if(product)
      res.json({ data: product })
    else
      res.status(404).json({ data: [], message: "Not found."});
  }

  res.status(401).json({ data: [], message: "Authorization Error!"});
}