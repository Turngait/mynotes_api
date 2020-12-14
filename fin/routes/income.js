const { Router } = require('express');

const Income = require('../models/income');

const router = Router();

router.post('/incomeforperiod', async (req, res) => {
  const {period, id_user} = req.body;
  const incomes = await Income.getIncomesForPeriod(period, id_user);
  res.json({incomes});
});

router.post('/addincome', async (req, res) => {
  const {income, id_user} = req.body;
  const status = await Income.addIncome(income, id_user);
  res.json({status});
});

router.post('/deleteincome', async (req, res) => {
  const {id, id_user} = req.body;
  const status = await Income.deleteIncome(id, id_user);
  res.json({status});
});


module.exports = router;
