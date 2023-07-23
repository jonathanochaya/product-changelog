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
      return res.json({ data: user.products })
    else
      return res.status(401).json({ data: [], message: "Authorization Error!" });
  }

  return res.status(401).json({ data: [], message: "Authorization Failed!"});
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
      return res.json({ data: product })
    else
      return res.status(404).json({ data: [], message: "Not found."});
  }

  return res.status(401).json({ data: [], message: "Authorization Error!"});
}


// Create product
export const createProduct = async (req: Request, res: Response) => {
  if(!req.user) return res.status(401).json({ data: [], message: "Authorization Error!"});
  
  const { name }: { name: string } = req.body;

  const product = await prisma.product.create({
    data: {
      name: name,
      belongsToId: req.user.id
    }
  });

  if(product)
    return res.json({ data: product })
  else
    return res.status(404).json({ data: [], message: "Not found."});
}


// Update product
export const updateProduct = async (req: Request, res: Response) => {
  if(!req.user) return res.status(401).json({ data: [], message: "Authorization Erro!" });

  const { name }: { name: string } = req.body;

  const product = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    },
    data: {
      name: name
    }
  });

  if(product)
    return res.json({ data: product })
  else
    return res.status(404).json({ data: [], message: "Not found."});
}


// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  if(!req.user) return res.status(401).json({ data: [], message: "Authorization Error!"});

  const product = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  });

  if(product)
    return res.json({ data: product })
  else
    return res.status(404).json({ data: [], message: "Not found."});
}