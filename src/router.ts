import { Router } from 'express';
import { body } from 'express-validator';
import { matchedData } from 'express-validator';
import { handleInputErrors, validateBodyField, validateDescriptionField, validateNameField, validateOptionalBodyField, validateOptionalDescriptionField, validateOptionalNameField, validateOptionalTitleField, validateOptionalVersionField, validateStatusField, validateTitleField, validateUpdateIdField, validateVersionField } from './modules/middleware';


const router = Router();

/**
 * Product
 */
router.get('/product', (req, res) => {
  res.json({'message': 'works'})
})

router.post('/product', validateNameField(), handleInputErrors, (req, res) => {
  
})

router.get('/product/:id', (req, res) => {
  
})

router.put('/product/:id', 
  validateNameField(), 
  handleInputErrors, 
  (req, res) => {

    const data = matchedData(req);

    res.json({ message: "works" });
});

router.delete('/product/:id', (req, res) => {
  
})


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