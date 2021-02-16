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
  let costs = null;
  if (status === 201){
    await Budget.decreaseBudget(id_user, cost.budget, +cost.amount);
    costs = await Costs.getCostsForPeriod(String(cost.date).substring(0, 7), id_user);
  }
  res.json({status, costs})
});

router.post('/deletecost', async (req, res) => {
  const {id_cost, id_user} = req.body;
  const {status, amount, id_budget} = await Costs.deleteCost(id_cost, id_user);
  await Budget.increaseBudget(id_user, id_budget, amount);
  res.json({status});
});

router.post('/groupadd', async (req, res) => {
  const {group_title, id_user} = req.body;
  const status = await Costs.addGroup(group_title, id_user);
  let costs = null;
  if (status === 201){
    costs = await Costs.getCostsForPeriod(new Date().toISOString().slice(0,7), id_user);
  }
  res.json({status, costs});
});

router.post('/groupdelete', async (req, res) => {
  console.log(req.body)
  const {id, id_user} = req.body;
  const status = await Costs.deleteGroup(id, id_user);
  res.json({status});
});

module.exports = router;
