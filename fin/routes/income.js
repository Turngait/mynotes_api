const { Router } = require('express');

const Income = require('../models/income');
const Budget = require('../models/budget');

const router = Router();

router.post('/incomeforperiod', async (req, res) => {
  const {period, id_user} = req.body;
  const incomes = await Income.getIncomesForPeriod(period, id_user);
  res.json({incomes});
});

router.post('/incomebysource', async (req, res) => {
  const {id_source, period, id_user} = req.body;
  const incomes = await Income.getIncomesForPeriodAndSource(id_source, period, id_user);
  res.json({incomes});
});

router.post('/addincome', async (req, res) => {
  const {income, id_user} = req.body;
  const status = await Income.addIncome(income, id_user);
  await Budget.increaseBudget(id_user, income.budget, +income.amount);
  res.json({status});
});

router.post('/deleteincome', async (req, res) => {
  const {id, id_user} = req.body;
  const {status, amount, budget} = await Income.deleteIncome(id, id_user);
  await Budget.decreaseBudget(id_user, budget, +amount);
  res.json({status});
});

router.post('/addsource', async (req, res) => {
  const {source, id_user} = req.body;
  const status = await Income.addSource(source, id_user);
  res.json({status});
});

router.post('/deletesource', async (req, res) => {
  const {id_source, id_user} = req.body;
  const status = await Income.deleteSource(id_source, id_user);
  res.json({status});
});


module.exports = router;
