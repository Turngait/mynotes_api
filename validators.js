const {body} = require('express-validator/check')

exports.loginValidators = [
  body('email').isEmail().withMessage('Введите правильный e-mail')
]

exports.signUpValidators = [
  body('email').isEmail().withMessage('Введите правильный e-mail'),
  body('pass').isLength({min: 5}).withMessage('Длина пароля должна быть не менее 5-ти символов'),
  body('name').isLength({min: 2}).withMessage('Длина имени должна быть не менее 2 символов')
]

exports.addCostGroupValidators = [
  body('groupTitle').isLength({min: 3}).withMessage('Длина названия должна быть не меенее 3х символов')
]

exports.addCostItemValidators = [
  body('cost.title').isLength({min: 3}).withMessage('Длина названия должна быть не меенее 3х символов'),
  body('cost.amount').isNumeric().withMessage('Сумма должна быть числом'),
  body('cost.amount').isLength({min: 1}).withMessage('Длина суммы должна быть не менее 1 символа')
]

exports.addIncomeValidators = [
  body('income.title').isLength({min: 3}).withMessage('Длина названия должна быть не меенее 3х символов'),
  body('income.amount').isNumeric().withMessage('Сумма должна быть числом'),
  body('income.amount').isLength({min: 1}).withMessage('Длина суммы должна быть не менее 1 символа')
]

exports.addBudgetValidators = [
  body('budget.title').isLength({min: 3}).withMessage('Длина названия должна быть не меенее 3х символов'),
  body('budget.balance').isNumeric().withMessage('Сумма баланса должна быть числом'),
  body('budget.balance').isLength({min: 1}).withMessage('Длина суммы должна быть не менее 1 символа')
]