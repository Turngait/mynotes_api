const fetch = require('node-fetch');

const {FIN_URL} = require('../config/api');

async function createBudget(id_user) {
  const {statusBalance} = await fetch(FIN_URL + 'budget/create', {
    method: 'POST',
    body: JSON.stringify({id_user}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json());

  return statusBalance;
}

async function getBudget(id_user) {
  const {budget} = await fetch(FIN_URL + 'budget/get', {
    method: 'POST',
    body: JSON.stringify({id_user}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json());

  return budget;
}

module.exports = {
  createBudget,
  getBudget
}