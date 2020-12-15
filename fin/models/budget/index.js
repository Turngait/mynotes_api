const budgetModel = require('./mongoose/budget');
const {calculateBalance} = require('./services');

class Budget {
  static async createBudget(id_user) {
    const isBudgetExist = await budgetModel.findOne({id_user});
    if (isBudgetExist) return 208;

    const budget = new budgetModel({
      id_user,
      balance: 0,
      items: [
        {
          title: 'Основной',
          balance: 0,
          created_at: new Date()
        }
      ]
    });

    try {
      await budget.save();
      return 202;
    } catch (error) {
      console.log(error);
      return 500;
    }
  }

  static async increaseBudget(id_user, id_budget, amount) {
    try {
      const budgets = await budgetModel.findOne({id_user});

      for(let item of budgets.items) {
        if(item._id == id_budget) {
          item.balance += amount;
        }
      }

      budgets.balance = calculateBalance(budgets.items);

      budgets.save();
      return 202;
    } catch (err) {
      console.log(err)
      return 500;
    }
  }

  static async decreaseBudget(id_user, id_budget, amount) {
    try {
      const budgets = await budgetModel.findOne({id_user});

      for(let item of budgets.items) {
        if(item._id == id_budget) {
          item.balance -= amount;
        }
      }

      budgets.balance = calculateBalance(budgets.items);

      budgets.save();
      return 202;
    } catch (err) {
      console.log(err)
      return 500;
    }
  }
}

module.exports = Budget;
