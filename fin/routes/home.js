const { Router } = require('express');

const Income = require('../models/income');
const Costs = require('../models/cost');
const Budget = require('../models/budget');

const router = Router();

router.get('/', async (req, res) => {
  console.log('Fin server is working now.');
  res.json({isAlive: true});
});

router.post('/getalldata', async (req, res) => {
  const {id_user, period} = req.body;
  const costs = await Costs.getCostsForPeriod(period, id_user);
  const incomes = await Income.getIncomesForPeriod(period, id_user);
  const {budget} = await Budget.getBudget(id_user);
  res.json({costs, incomes, budget});
});

router.post('/newuser', async (req, res) => {
  const {id_user} = req.body;
  const statusBalance = await Budget.createBudget(id_user);
  const statusGroup = await Costs.addGroup('Общая', id_user);
  const statusSource = await Income.addSource('Основной', id_user);
  let status = 500;

  if(statusBalance === 202 && statusGroup === 204 && statusSource === 204) status = 204;
  res.json({status});
});

router.post('/groupsdata', async (req, res) => {
  const {id_user, period} = req.body;
  const groups = await Costs.getGroupData(id_user, period);
  const sources = await Income.getSourceData(id_user, period);
  const costsAmount = await Costs.getCostsAmountForPeriod(id_user, period);
  const incomesAmount = await Income.getIncomeAmountForPeriod(id_user, period);
  const stat = {costsAmount, incomesAmount};
  
  res.json({groups, sources, stat});
});

module.exports = router;
