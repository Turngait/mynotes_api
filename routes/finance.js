const {Router} = require('express');
const FinanceController = require('../controllers/finance_controller');

const router = Router();

router.get('/cost/get/:token', async (req, res) => {
  FinanceController.getAllCostForUser(req, res);
})

router.post('/cost/add', async (req, res) => {
  FinanceController.addCost(req, res);
})

router.delete('/cost/:id/:token', async (req, res) => {

})

router.put('/cost/edit/:id', async (req, res) => {

})

router.post('/group/add', async (req, res) => {
  FinanceController.addCostGroup(req, res);
})

module.exports = router;
