function calculateBalance(budgets) {
  let sum = 0;
  for(const budget of budgets) {
    sum += budget.balance;
  } 
  return sum;
}

module.exports = {
  calculateBalance
}