function calculateBalance(budgets) {
  let sum = 0;
  for(const budget of budgets) {
    sum += budget.balance;
  } 
  return sum;
}

function isBudgetEmpty(budgets, id_budget) {
  for(const budget of budgets) {
    if (budget._id.toString() === id_budget && budget.balance === 0) return true;
  }

  return false;
} 

module.exports = {
  calculateBalance,
  isBudgetEmpty
}

