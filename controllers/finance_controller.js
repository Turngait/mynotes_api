const fetch = require('node-fetch');

const DTO = require('../models/dto');
const {FIN_URL} = require('../config/api');
const {getUserId} = require('../utils/user');

class FinController {

  static async getAllDataForPeriod(req, res) {
    const {period, token} = req.body;
    const id_user = await getUserId(token);

    const { costs, incomes, budget } = await fetch(FIN_URL + 'getalldata', {
      method: 'POST',
      body: JSON.stringify({period, id_user}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json());

    res.json({costs, incomes, budget});
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
    const id_user = await getUserId(token);

    const { costs } = await fetch(FIN_URL + 'costs/costsforgroupandperiod', {
      method: 'POST',
      body: JSON.stringify({period, id_group, id_user}),
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
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL+ 'costs/groupadd', {
      method: 'POST',
      body: JSON.stringify({group_title: groupTitle, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse())
  }

  static async deleteCostGroup(req, res) {
    const response = new DTO();
    const {id, token} = req.params;
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL+ 'costs/groupdelete', {
      method: 'POST',
      body: JSON.stringify({id, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }

  static async getAllIncomesByPeriod(req, res) {
    const {period, token} = req.params;
    const id_user = await getUserId(token);

    const {incomes} = await fetch(FIN_URL + 'incomes/incomeforperiod', {
      method: 'POST',
      body: JSON.stringify({period, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    const response = new DTO();

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

  static async getAllIncomesByPeriodAndSource(req, res) {
    const {id_source, period, token} = req.body;
    const id_user = await getUserId(token);

    const {incomes} = await fetch(FIN_URL + 'incomes/incomebysource', {
      method: 'POST',
      body: JSON.stringify({id_source, period, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());
    

    const response = new DTO();

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
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL + 'incomes/addincome', {
      method: 'POST',
      body: JSON.stringify({income, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }

  static async addSource(req, res) {
    const response = new DTO();
    const {source, token} = req.body;
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL + 'incomes/addsource', {
      method: 'POST',
      body: JSON.stringify({source, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }

  static async deleteSource(req, res) {
    const response = new DTO();
    const {id, token} = req.params;
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL+ 'incomes/deletesource', {
      method: 'POST',
      body: JSON.stringify({id, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }

  static async deleteIncome(req, res) {
    const response = new DTO();
    const {id, token} = req.params;
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL + 'incomes/deleteincome', {
      method: 'POST',
      body: JSON.stringify({id, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }

  static async saveBalance(req, res) {

  }

  static async addBudget(req, res) {
    const response = new DTO();
    const {budget, token} = req.body;
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL + 'budget/add', {
      method: 'POST',
      body: JSON.stringify({budget, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }

  static async editBudget(req, res) {
    const response = new DTO();
    const {budget, token} = req.body;
    const id_user = await getUserId(token);

    const {status} = await fetch(FIN_URL + 'budget/edit', {
      method: 'POST',
      body: JSON.stringify({budget, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }

  static async deleteBudget(req, res) {
    const response = new DTO();
    const {id_budget, token} = req.body;
    const id_user = await getUserId(token);

    const {status, error} = await fetch(FIN_URL + 'budget/delete', {
      method: 'POST',
      body: JSON.stringify({id_budget, id_user}),
      headers: {'Content-Type': 'application/json' }
    }).then(res => res.json());

    if(status === 500) response.setStatusText('Server error');
    if(status === 422) response.setErrors(error);
    response.setStatus(status);
    res.status(status);

    res.json(response.getResponse());
  }
}

module.exports = FinController;
