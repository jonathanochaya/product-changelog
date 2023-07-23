import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products';
import { createProductUpdate, deleteProductUpdate, getProductUpdate, getProductUpdates, updateProductUpdate } from './handlers/update';
import { handleInputErrors, validateBodyField, validateDescriptionField, validateNameField, validateOptionalBodyField, validateOptionalDescriptionField, validateOptionalNameField, validateOptionalTitleField, validateOptionalVersionField, validateProductIdField, validateStatusField, validateTitleField, validateUpdateIdField, validateVersionField } from './modules/middleware';


const router = Router();

/**
 * Product
 */
/* Get all products by user */
router.get('/product', getProducts);

/* Create new product */
router.post('/product', 
  validateNameField(), 
  handleInputErrors, createProduct)

/* Get product by id */
router.get('/product/:id', getProduct);

/* Update product by id */
router.put('/product/:id', 
  validateNameField(), 
  handleInputErrors, updateProduct);

/* Delete product by id */
router.delete('/product/:id', deleteProduct);


/**
 * Update
 */
/* Get all product updates by user */
router.get('/update', getProductUpdates);

/* Create new product update */
router.post('/update', 
  validateTitleField(), validateBodyField(),
  validateProductIdField(), createProductUpdate);

/* Get product update by id */
router.get('/update/:id', getProductUpdate)

/* Update product update by id */
router.put('/update/:id',  
  validateOptionalTitleField(), 
  validateOptionalBodyField(), validateStatusField(), 
  validateOptionalVersionField(), updateProductUpdate);

/* Delete product update by id */
router.delete('/update/:id', deleteProductUpdate)


/**
 * Update Point
 */
router.get('/updatepoint', (req, res) => {

})

router.post('/updatepoint',
  validateNameField(),
  validateDescriptionField(),
  (req, res) => {
  
})

router.get('/updatepoint/:id', (req, res) => {
  
})

router.put('/updatepoint/:id', 
  validateOptionalNameField(),
  validateOptionalDescriptionField(),
  validateUpdateIdField(),
  (req, res) => {
  
})

router.delete('/updatepoint/:id', (req, res) => {
  
})

export default router;