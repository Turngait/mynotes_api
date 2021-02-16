const { Router } = require('express');

const Budget = require('../models/budget');

const router = Router();

router.post('/create', async (req, res) => {
  const statusBalance = await Budget.createBudget(req.body.id_user);
  res.json({statusBalance});
});

router.post('/get', async (req, res) => {
  const {budget, status} = await Budget.getBudget(req.body.id_user);
  res.json({budget, status});
});

router.post('/add', async (req, res) => {
  const {budget, id_user} = req.body;
  let budgets = null;
  const status = await Budget.addBudget(budget, id_user);
  if (status === 201) {
    const budgetData = await Budget.getBudget(id_user);
    budgets = budgetData.budget;
  }
  res.json({status, budgets});
});

router.post('/edit', async (req, res) => {
  const {budget, id_user} = req.body;
  const status = await Budget.editBudget(budget, id_user);
  let budgets = null;
  if (status === 202) {
    const budgetData = await Budget.getBudget(id_user);
    budgets = budgetData.budget;
  }
  res.json({status, budgets});
});

router.post('/delete', async (req, res) => {
  const {id_budget, id_user} = req.body;
  const {status, error} = await Budget.deleteBudget(id_budget, id_user);
  let budgets = null;
  if (status === 202) {
    const budgetData = await Budget.getBudget(id_user);
    budgets = budgetData.budget;
  }
  res.json({status, error, budgets})
});

module.exports = router;
