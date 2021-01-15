const fetch = require('node-fetch');
const {AUTH_URL} = require('../config/api');

async function getUserId(token) {
  const { id } = await fetch(AUTH_URL + 'getuserid', {
    method: 'POST',
    body: JSON.stringify({token}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json());
  return id;
}

module.exports = {
  getUserId
}