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
  const status = await Budget.addBudget(budget, id_user);
  res.json({status});
})

module.exports = router;
