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
})

module.exports = router;
