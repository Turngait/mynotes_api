const {Router} = require('express');
const FinanceController = require('../controllers/finance_controller');
const {validationResult} = require('express-validator/check');
const {addCostGroupValidators, addCostItemValidators, addIncomeValidators} = require('../validators')

const router = Router();

router.get('/cost/get/:period/:token', async (req, res) => {
  FinanceController.getAllCostByPeriod(req, res);
})

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

router.delete('/group/delete/:id/:token', async (req, res) => {
  FinanceController.deleteCostGroup(req, res);
})

router.get('/income/get/:period/:token', async (req, res) => {
  FinanceController.getAllIncomesByPeriod(req, res);
})

router.post('/income/add', addIncomeValidators, async (req, res) => {
  const errors = validationResult(req)
  if (errors.isEmpty()){
    FinanceController.addIncome(req, res);
  } else {
    res.status(422)
    res.json({errors})
  }
})

router.delete('/income/delete/:token/:id', async (req, res) => {
  FinanceController.deleteIncome(req, res);
})

module.exports = router;
