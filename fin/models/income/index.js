const incomeModel = require('./mongoose/income');
const sourceModel = require('./mongoose/source');
const {normalizeIncomes} = require('./services');

class Income {

  static async getIncomesForPeriod(period, id_user) {
    const incomes =  await incomeModel.find({id_user, period}).sort('-date') || [];
    const sources = await sourceModel.findOne({id_user}) || [];
    return normalizeIncomes({incomes: normalizeIncomes(incomes), sources: sources.sources});
  }

  static async addIncome(income, id_user) {
    console.log(income)
    const newIncome = new incomeModel({
      id_user,
      period: String(income.date).substring(0, 7),
      title: income.title,
      description: income.description,
      amount: income.amount,
      id_source: income.source,
      id_budget: income.budget,
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

  static async addSource(source_title, id_user) {
    try {
      const Candidate = await sourceModel.findOne({id_user});

      if (Candidate) {
        const source = {title: source_title}
        Candidate.sources.push(source)
        await Candidate.save();
      } else {
        const incomeSource = new sourceModel({
          id_user,
          sources: [{
            title: source_title
          }]
        });
        incomeSource.save();
      }

      return 204;
    } catch(error) {
      console.log(error);
      return 500;
    }
  }
  
}

module.exports = Income;