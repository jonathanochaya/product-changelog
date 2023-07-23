import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { request } from 'http';
import prisma from '../modules/db';
import { MatchedUpdateInfo } from '../types/custom';

// Get all product updates 
export const getUpdates = async (req: Request, res: Response) => {
  if(!req.user) return res.status(401).json({ data: [], message: "Not Authorized!"});

  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    select: {
      name: true,
      updates: {
        select: {
          title: true,
          body: true,
          status: true,
          version: true,
          asset: true,
        }
      }
    }
  });

  return res.json({ data: products })
}

// Get single product update by it's id
export const getUpdate = async (req: Request, res: Response) => {
  if(!req.user) return res.status(401).json({ data: [], message: "Not Authorized!" });

  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id
    }
  });

  if(update)
    res.json({ data: update });
  else
    res.json({ data: null });
}

// Create product update
export const createUpdate = async (req: Request, res: Response) => {
  if(!req.user) return res.status(401).json({ data: [], message: "Not Authorized"});

  /* check product exists */
  const { productId }: { productId: string } = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
      belongsToId: req.user.id
    }
  });

  if(!product) {

    return res.json({ message: "Invalid Product" })
  
  } else {
    /* if we have product - get product update matched data from express validator */
    const data: MatchedUpdateInfo = <MatchedUpdateInfo> matchedData(req);

    const update = await prisma.update.create({
      data: {
        title: data.title,
        body: data.body,
        productId: data.productId
      }
    });

    res.json({ data: update });
  }
}

// Update product update
export const updateUpdate = async (req: Request, res: Response) => {
  if(!req.user)  return res.status(401).json({ data: [], message: "Not Authorized!"});
  
  const productUpdate = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
    },
    select: {
      name: true,
      updates: {
        where: {
          id: req.params.id
        }
      }
    }
  });

  if(!productUpdate?.updates) {
    return res.json({ data: [], message: "Invalid product update"});
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body
  });

  return res.json({ data: updatedUpdate });
}

// Delete product update
export const deleteUpdate = async (req: Request, res: Response) => {
  if(!req.user) return res.status(401).json({ data: [], message: "Not Authorized!"});

  
}