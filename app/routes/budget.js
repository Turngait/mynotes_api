const { Router } = require('express');
const {validationResult} = require('express-validator/check');

const FinController = require('../controllers/finance_controller');
const {addBudgetValidators} = require('../validators');

const router = Router();

router.post('/add', addBudgetValidators, async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()){
    FinController.addBudget(req, res);
  } else {
    res.status(422)
    res.json({errors})
  }
});

router.post('/edit', async (req, res) => {
  FinController.editBudget(req, res);
});

router.post('/delete', async (req, res) => {
  FinController.deleteBudget(req, res);
})

module.exports = router;
