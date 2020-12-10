const fetch = require('node-fetch');

const DTO = require('../models/dto');
const costGroup_model = require('../mongoose/costGroup_model');
const cost_model = require('../mongoose/cost_model');
const income_model = require('../mongoose/income_model');
const Finance = require('../models/Finance');
const {FIN_URL} = require('../config/api');
const {getUserId} = require('../utils/user');

class FinController {
  static async getAllCostForUser(req, res) {
    const {token} = req.params;
    const finance = new Finance(cost_model, costGroup_model);
    const data = await finance.getAllCostForUser(token);
      if(data.groups && data.costs) {
        res.json({groups: data.groups.groups, costs: data.items});
      } else {
        res.json({groups: [], costs: []});
      }
  }

  static async getAllCostByPeriod(req, res) {
    const {period, token} = req.params;
    const id_user = await getUserId(token);
    const { costs } = await fetch(FIN_URL + 'costs/costsforperiod', {
      method: 'POST',
      body: JSON.stringify({period, id_user}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())

    const response = new DTO();

    if (costs) {
      res.status(200);
      response.setStatus(200);
      response.setData({costs});
      res.json(response.getResponse());
    } else {
      res.status(503)
      res.json(response.getResponse());
    }
  }

  static async getAllCostByGroup(req, res) {
    const {id_group, period, token} = req.params;
    const response = new DTO();
    const finance = new Finance(cost_model, costGroup_model);
    const costs = await finance.getCostsByGroup(id_group, period, token);

    if (costs) {
      res.status(200);
      response.setStatus(200);
      response.setData({costs});
      res.json(response.getResponse());
    } else {
      res.status(503)
      res.json(response.getResponse());
    }
  }

  static async addCost(req, res) {
    const response = new DTO();
    const {token, cost} = req.body;
    const id_user = await getUserId(token);
    
    const { status } = await fetch(FIN_URL + 'costs/addcost', {
      method: 'POST',
      body: JSON.stringify({cost, id_user}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);
    res.json(response.getResponse());
  }

  static async editCost(req, res) {

  }

  static async deletCost(req, res) {
    const response = new DTO();
    const {id, token} =req.params;
    const id_user = await getUserId(token);

    const { status } = await fetch(FIN_URL + 'costs/deletecost', {
      method: 'POST',
      body: JSON.stringify({id_cost: id, id_user}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);
    res.json(response.getResponse());
  }

  static async addCostGroup(req, res) {
    const response = new DTO()
    const {token, groupTitle} = req.body;
    const finance = new Finance(cost_model, costGroup_model);
    let result = finance.addCostGroup(token, groupTitle);

    if(result) {
      res.status(204);
      response.setStatus(204);
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
    }

    res.json(response.getResponse())
  }

  static async deleteCostGroup(req, res) {
    const response = new DTO();
    const {id, token} =req.params;
    const finance = new Finance(cost_model, costGroup_model);
    let result = await finance.deleteCostGroup(token, id);

    if(result) {
      res.status(204);
      response.setStatus(204);
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
    }
    res.json(response.getResponse())
  }

  static async getAllIncomesByPeriod(req, res) {
    const {period, token} = req.params;
    const response = new DTO();
    const finance = new Finance(cost_model, costGroup_model, income_model);
    const incomes = await finance.getIncomesByPeriod(period, token);

    if (incomes) {
      res.status(200);
      response.setStatus(200);
      response.setData({incomes});
      res.json(response.getResponse());
    } else {
      res.status(503)
      res.json(response.getResponse());
    }
  }

  static async addIncome(req, res) {
    const response = new DTO();
    const {income, token} = req.body;
    const finance = new Finance(cost_model, costGroup_model, income_model);
    const result = await finance.addIncome(income, token);

    if(result) {
      res.status(204);
      response.setStatus(204);
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
    }
    res.json(response.getResponse())
  }

  static async deleteIncome(req, res) {
    const response = new DTO();
    const {id, token} = req.params;
    const finance = new Finance(cost_model, costGroup_model, income_model);
    const result = finance.deleteIncome(id, token);

    if(result) {
      res.status(204)
      response.setStatus(204)
    } else {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
    }
    res.json(response.getResponse())
  }

  static async saveBalance(req, res) {
    const response = new DTO();
    const {token, balance} = req.body;
    const finance = new Finance(cost_model, costGroup_model, income_model);
    const result = finance.saveBalance(balance, token);

    if(result) {
      res.status(204)
      response.setStatus(204)
    } else {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
    }
    res.json(response.getResponse())
  }
}

module.exports = FinController