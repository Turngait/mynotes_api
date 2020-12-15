const { Router } = require('express');

const Budget = require('../models/budget');

const router = Router();

router.post('/create', async (req, res) => {
  const statusBalance = await Budget.createBudget(req.body.id_user);
  res.json({statusBalance});
});

module.exports = router;
