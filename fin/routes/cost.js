const { Router } = require('express');

const Costs = require('../models/cost');

const router = Router();

router.post('/costsforperiod', async (req, res) => {
  const costs = await Costs.getCostsForPeriod(req.body.period, req.body.id_user);
  res.json({costs});
});

router.post('/addcost', async (req, res) => {
  const {cost, id_user} = req.body;
  const status = await Costs.addCost(cost, id_user);
  res.json({status})
});

router.post('/deletecost', async (req, res) => {
  const {id_cost, id_user} = req.body;
  const status = await Costs.deleteCost(id_cost, id_user);
  res.json({status});
})

module.exports = router;
