import { NextFunction, Request, Response } from 'express';
import { body, validationResult as validate } from 'express-validator';
import { AllErrorHandler } from '../types/custom';


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validate(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}

// required Fields
export const validateNameField = () => body('name').notEmpty().escape();
export const validateTitleField = () => body('title').notEmpty().escape();
export const validateBodyField = () => body('body').notEmpty().escape();
export const validateStatusField = () => body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']);
export const validateVersionField = () => body('version').notEmpty().escape();
export const validateDescriptionField = () => body('description').notEmpty().escape();
export const validateUpdateIdField = () => body('updateId').notEmpty().isString().escape();
export const validateProductIdField = () => body('productId').notEmpty().isString().escape();

// optional fields
export const validateOptionalNameField = () => body('name').optional().escape();
export const validateOptionalTitleField = () => body('title').optional().escape();
export const validateOptionalBodyField = () => body('body').optional().escape();
export const validateOptionalStatusField = () => body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']);
export const validateOptionalVersionField = () => body('version').optional().escape();
export const validateOptionalDescriptionField = () => body('description').optional().escape();

// error boundary
export const defaultErrorBoundary = (err: AllErrorHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(`Path: ${req.path}, Error: ${err.name}, Message: ${err.message}`);
  next();
}