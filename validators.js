const {body} = require('express-validator/check')

exports.loginValidators = [
  body('email').isEmail().withMessage('Must be an e-mail')
]

exports.signUpValidators = [
  body('email').isEmail().withMessage('Must be an e-mail'),
  body('pass').isLength({min: 5}).withMessage('Length must be more then 5 letters'),
  body('name').isLength({min: 3}).withMessage('Length must be more then 3 letters')
]

exports.addWlistValidators = [
  body('price').isCurrency().withMessage('Must be a price'),
  body('name').isLength({min: 3}).withMessage('Length must be more then 3 letters')
]