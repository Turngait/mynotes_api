const {Router} = require('express');
const FinanceController = require('../controllers/finance_controller');
const {validationResult} = require('express-validator/check');
const {addCostGroupValidators, addCostItemValidators} = require('../validators')

const router = Router();

router.get('/cost/get/:token', async (req, res) => {
  FinanceController.getAllCostForUser(req, res);
})

router.post('/cost/add', addCostItemValidators, async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()){
  FinanceController.addCost(req, res);
  } else {
    res.status(422)
    res.json({errors})
  }
})

router.delete('/cost/:id/:token', async (req, res) => {
  FinanceController.deletCost(req, res);
})

router.put('/cost/edit/:id', async (req, res) => {

})

router.post('/group/add', addCostGroupValidators, async (req, res) => {
  const errors = validationResult(req)
  if (errors.isEmpty()){
  FinanceController.addCostGroup(req, res);
  } else {
    res.status(422)
    res.json({errors})
  }
})

module.exports = router;
