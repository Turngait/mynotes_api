const incomeModel = require('./mongoose/income');
const sourceModel = require('./mongoose/source');
const {normalizeIncomes, normalizeSourceData} = require('./services');

class Income {

  static async getIncomesForPeriod(period, id_user) {
    const incomes =  await incomeModel.find({id_user, period}).sort('-date') || [];
    const sources = await sourceModel.findOne({id_user}) || [];
    return normalizeIncomes({incomes: normalizeIncomes(incomes), sources: sources.sources});
  }

  static async getIncomesForPeriodAndSource(id_source, period, id_user) {
    const incomes =  await incomeModel.find({id_user, id_source, period}).sort('-date') || [];
    const sources = await sourceModel.findOne({id_user}) || [];
    return normalizeIncomes({incomes: normalizeIncomes(incomes), sources: sources.sources});
  }

  static async addIncome(income, id_user) {
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
      return 201;
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
        return {status: 204, amount: income.amount, budget: income.id_budget};
      } else {
        return {status: 403, amount: null, budget: null};
      }
    } catch(error) {
      console.log(error)
      return {status: 500, amount: null, budget: null};
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
        await incomeSource.save();
      }

      return 201;
    } catch(error) {
      console.log(error);
      return 500;
    }
  }

  static async deleteSource(id_source, id_user) {
    try {
      const source = await sourceModel.findOne({id_user});

      if(source) {
        source.sources = source.sources.filter(i => i._id.toString() !== id_source);
        source.save();
        return 204;
      } else {
        return 403;
      }
    } catch(err) {
      console.log(err);
      return 500;
    }
  }

  static async editSource(id_source, id_user, newTitle) {
    try {
      const sources = await sourceModel.findOne({id_user});
    
      if(sources) {
        sources.sources.map(source => {
          if (source._id.toString() === id_source) source.title = newTitle;
        });
        sources.save();
        return 204;
      } else {
        return 403;
      }
    } catch(err) {
      console.log(err)
      return 500;
    }
  }

  static async getSourceData(id_user, period) {
    const data = await Income.getIncomesForPeriod(period, id_user);
    return normalizeSourceData(data);
  }

  static async getIncomeAmountForPeriod(id_user, period) {
    const incomes = await incomeModel.find({id_user, period}) || [];
    let incomesForPeriod = 0;
    if (incomes.length > 0) {
      for (let income of incomes) {
        incomesForPeriod += income.amount;
      }
    }
    return incomesForPeriod;
  }
  
}

module.exports = Income;