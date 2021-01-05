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

  static async addBudget(budget, id_user) {
    const budgets = await budgetModel.findOne({id_user});
    if(budgets) {
      budgets.items.push(budget);
      budgets.balance += +budget.balance;
      try {
        budgets.save();
        return 204;
      } catch (error) {
        console.log(error);
        return 500;
      }
    } else {
      const newBudget = new budgetModel({
        id_user,
        balance: budget.balance,
        items: [
          budget
        ]
      });
      try {
        await newBudget.save();
        return 204;
      } catch (error) {
        console.log(error);
        return 500;
      }
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

  static async getBudget(id_user) {
    try {
      const budget = await budgetModel.findOne({id_user});
      return {status: 200, budget: {balance: budget.balance, items: budget.items}};
    } catch (error) {
      console.log(error)
      return {status: 500, budget: null};
    }
  }
}

module.exports = Budget;
