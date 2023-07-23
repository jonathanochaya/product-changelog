import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products';
import { handleInputErrors, validateBodyField, validateDescriptionField, validateNameField, validateOptionalBodyField, validateOptionalDescriptionField, validateOptionalNameField, validateOptionalTitleField, validateOptionalVersionField, validateStatusField, validateTitleField, validateUpdateIdField, validateVersionField } from './modules/middleware';


const router = Router();

/**
 * Product
 */
/* Get all products by user */
router.get('/product', getProducts);

/* Create new product */
router.post('/product', validateNameField(), handleInputErrors, createProduct)

/* Get product by id */
router.get('/product/:id', getProduct);

/* Update product by id */
router.put('/product/:id', validateNameField(), handleInputErrors, updateProduct);

/* Delete product by id */
router.delete('/product/:id', deleteProduct);


/**
 * Update
 */
router.get('/update', (req, res) => {

})

router.post('/update', 
  validateTitleField(), 
  validateBodyField(),
  (req, res) => {

});

router.get('/update/:id', (req, res) => {
  
})

router.put('/update/:id',  
  validateOptionalTitleField(), 
  validateOptionalBodyField(),
  validateStatusField(),
  validateOptionalVersionField(), 
  (req, res) => {
  
})

router.delete('/update/:id', (req, res) => {
  
})


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