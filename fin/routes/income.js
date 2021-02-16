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
  let incomes = null;
  if (status === 201) {
    await Budget.increaseBudget(id_user, income.budget, +income.amount);
    incomes = await Income.getIncomesForPeriod(String(income.date).substring(0, 7), id_user);
  }
  res.json({status, incomes});
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
  let incomes = null;
  if (status === 201) {
    incomes = await Income.getIncomesForPeriod(new Date().toISOString().slice(0,7), id_user);
  }
  res.json({status, incomes});
});

router.post('/deletesource', async (req, res) => {
  const {id, id_user} = req.body;
  const status = await Income.deleteSource(id, id_user);
  res.json({status});
});


module.exports = router;
