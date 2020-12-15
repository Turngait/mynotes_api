const { Router } = require('express');

const Costs = require('../models/cost');
const Budget = require('../models/budget');

const router = Router();

router.post('/costsforperiod', async (req, res) => {
  const costs = await Costs.getCostsForPeriod(req.body.period, req.body.id_user);
  res.json({costs});
});

router.post('/costsforgroupandperiod', async (req, res) => {
  const costs = await Costs.getCostsForGroupAndPeriod(req.body.period, req.body.id_group, req.body.id_user);
  res.json({costs});
});

router.post('/addcost', async (req, res) => {
  const {cost, id_user} = req.body;
  const status = await Costs.addCost(cost, id_user);
  await Budget.increaseBudget(id_user, '5fd869d627c337012df8c64d', +cost.amount);
  res.json({status})
});

router.post('/deletecost', async (req, res) => {
  const {id_cost, id_user} = req.body;
  const {status, amount} = await Costs.deleteCost(id_cost, id_user);
  await Budget.decreaseBudget(id_user, '5fd869d627c337012df8c64d', amount);
  res.json({status});
});

router.post('/groupadd', async (req, res) => {
  const {group_title, id_user} = req.body;
  const status = await Costs.addGroup(group_title, id_user);
  res.json({status});
});

router.post('/groupdelete', async (req, res) => {
  console.log(req.body)
  const {id, id_user} = req.body;
  const status = await Costs.deleteGroup(id, id_user);
  res.json({status});
})

module.exports = router;
