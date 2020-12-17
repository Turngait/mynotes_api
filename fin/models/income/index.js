const incomeModel = require('./mongoose/income');
const {normalizeIncomes} = require('./services');

class Income {

  static async getIncomesForPeriod(period, id_user) {
    const incomes =  await incomeModel.find({id_user, period}) || [];
    return normalizeIncomes(incomes);
  }

  static async addIncome(income, id_user) {
    const newIncome = new incomeModel({
      id_user,
      period: String(income.date).substring(0, 7),
      title: income.title,
      description: income.description,
      amount: income.amount,
      date: income.date,
      createdAt: new Date()
    })

    try {
      newIncome.save();
      return 204;
    } catch (error) {
      console.log(error)
      return 500;
    }
  }

  static async deleteIncome(id, id_user) {
    try {
      const income = await incomeModel.findOne({_id: id, id_user});
      if(income) {
        await incomeModel.deleteOne({_id: id, id_user});
        return 204;
      } else {
        return 403;
      }
    } catch(error) {
      console.log(error)
      return 500;
    }
  }
  
}

module.exports = Income;