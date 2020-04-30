const {body} = require('express-validator/check')

exports.loginValidators = [
  body('email').isEmail().withMessage('Must be an e-mail')
]

exports.signUpValidators = [
  body('email').isEmail().withMessage('Must be an e-mail'),
  body('pass').isLength({min: 5}).withMessage('Length of password must be more then 5 letters'),
  body('name').isLength({min: 2}).withMessage('Length of name must be more then 2 letters')
]

exports.addWlistValidators = [
  body('price').isCurrency().withMessage('Must be a price'),
  body('name').isLength({min: 3}).withMessage('Length of title must be more then 3 letters')
]

exports.addWlistGroupValidators = [
  body('title').isLength({min: 3}).withMessage('Length of title must be more then 3 letters')
]

exports.addCostGroupValidators = [
  body('groupTitle').isLength({min: 3}).withMessage('Length of title must be more then 3 letters')
]

exports.addCostItemValidators = [
  body('cost.title').isLength({min: 3}).withMessage('Length of title must be more then 3 letters'),
  body('cost.amount').isNumeric().withMessage('Ammount of cost must be a numeric'),
  body('cost.amount').isLength({min: 1}).withMessage('Ammount of cost must be a numeric')
]