const DTO = require('../models/dto');
const costGroup_model = require('../mongoose/costGroup_model');
const cost_model = require('../mongoose/cost_model');
const income_model = require('../mongoose/income_model');
const Finance = require('../models/Finance');

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
    const response = new DTO();
    const finance = new Finance(cost_model, costGroup_model);
    const costs = await finance.getCostsByPeriod(period, token);

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
    const finance = new Finance(cost_model, costGroup_model);
    let result = finance.addCost(token, cost);

      if (result) {
        res.status(204);
        response.setStatus(204);
      } else {
        res.status(503);
        response.setStatus(503);
        response.setStatusText('Server error');
      }

    res.json(response.getResponse());
  }

  static async editCost(req, res) {

  }

  static async deletCost(req, res) {
    const response = new DTO();
    const {id, token} =req.params;
    const finance = new Finance(cost_model, costGroup_model);
    const result = finance.deleteCost(token, id)

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
}

module.exports = FinController