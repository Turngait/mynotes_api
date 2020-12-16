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
})

module.exports = router;
