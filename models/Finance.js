const DAO = require('./dao');
const user_model = require('./user_model');
const {getUserId} = require('../utils/user');

// TODO Move all Finance to microservice. Improve all dependences
class Finance extends DAO {
  constructor (costModel, costGroupModel, incomeModel = null) {
    super('Cost');
    this.costModel = costModel;
    this.costGroupModel = costGroupModel;
    this.incomeModel = incomeModel;
  }
  
  async getAllCostForUser(token) {
    const id_user = await getUserId(token);
    if (id_user) {
      const groups = await this.costGroupModel.findOne({id_user});
      const costs = await this.costModel.findOne({id_user});
      costs.items.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      const periods = new Set();
      costs.items.map((item) => {
        periods.add(item.date)
      })
      const items = [];

      for (let period of periods) {
        let item = costs.items.filter((item) => item.date === period);
        let spentByDay = 0;
        for (let i of item) {
          spentByDay += i.amount;
        }
        items.push({period, items: item, spentByDay})
      }

      return {groups, costs, items};
    } else {
      return {groups: [], costs: []};
    }
  }

  async getCostsByPeriod(period, token) {
    const id_user = await getUserId(token);
    let groups = await this.costGroupModel.findOne({id_user}) || [];
    let costs = await this.costModel.findOne({id_user}) || [];
    const items = [];

    if (costs.items) {
      costs = costs.items.filter((item) => item.period === period);

      costs.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });

      const periods = new Set();
      costs.map((item) => {
        periods.add(item.date)
      })
      let spentByPeriod = 0;
  
      for (let period of periods) {
        let item = costs.filter((item) => item.date === period);
        let spentByDay = 0;
        for (let i of item) {
          spentByDay += i.amount;
          spentByPeriod += i.amount;
        }
        items.push({period, items: item, spentByDay, spentByThisMonth: spentByPeriod})
      }
  
      items.reverse();
    }

    return {items, groups: groups.groups};
  }

  async getCostsByGroup(id_group, period, token) {
    const id_user = await getUserId(token);
    const groups = await this.costGroupModel.findOne({id_user});
    let costs = await this.costModel.findOne({id_user});
    let costsByGroup;
    costs = costs.items.filter((item) => item.period === period);
    costsByGroup = costs.filter((item) => item.id_group === id_group);
    costs = costsByGroup;
    

    costs.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });

    const periods = new Set();
    costs.map((item) => {
      periods.add(item.date)
    })
    const items = [];
    let spentByPeriod = 0;

    for (let period of periods) {
      let item = costs.filter((item) => item.date === period);
      let spentByDay = 0;
      for (let i of item) {
        spentByDay += i.amount;
        spentByPeriod += i.amount;
      }
      items.push({period, items: item, spentByDay, spentByThisMonth: spentByPeriod})
    }

    items.reverse();

    return {items, groups: groups.groups};
  }



  async addCostGroup(token, groupTitle) {
    let result = null;
    const id_user = await getUserId(token);
    const Candidate = await this.costGroupModel.findOne({id_user});

    if (Candidate) {
      const group = {title: groupTitle}
      Candidate.groups.push(group)
      result = await Candidate.save()
    } else {
      const costGroup = new this.costGroupModel({
        id_user,
        groups: [{
          title: groupTitle
        }]
      });
      result = costGroup.save()
    }

    return result;
  }

  async deleteCostGroup(token, id) {
    const id_user = await getUserId(token);
    if(id_user) {
      const costGroups = await this.costGroupModel.findOne({id_user});
      costGroups.groups = costGroups.groups.filter(i => i._id.toString() !== id);
      if (costGroups.save()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }


  async getIncomesByPeriod(period, token) {
    const id_user = await getUserId(token);
    let incomes = await this.incomeModel.findOne({id_user}) || [];
    const items = [];

    if(incomes.items) {
      incomes = incomes.items.filter((item) => item.period === period);

      incomes.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });

      const periods = new Set();
      incomes.map((item) => {
        periods.add(item.date)
      })
      let incomeByPeriod = 0;
  
      for (let period of periods) {
        let item = incomes.filter((item) => item.date === period);
        let incomeByDay = 0;
        for (let i of item) {
          incomeByDay += i.amount;
          incomeByPeriod += i.amount;
        }
        items.push({period, items: item, incomeByDay, incomeByThisMonth: incomeByPeriod})
      }
  
      items.reverse();
    }
    
    return items;
  }

  async addIncome(income, token) {
    let result = null;
    const id_user = await getUserId(token);
    const Income = {
      title: income.title,
      text: income.descrition,
      period: String(income.date).substring(0, 7),
      amount: income.amount,
      date: income.date
    };

    const Candidate = await this.incomeModel.findOne({id_user});

    if(Candidate) {
      Candidate.items.push(Income);
      result = Candidate.save();
    } else {
      const incomeItem = new this.incomeModel({
        id_user,
        items: [
          Income
        ],
        createdAt: income.date
      });
  
      result = incomeItem.save();
    }
    if (result) {
      this.__increaseBalance(income.amount, token);
    }
    return result;
  }

  async deleteIncome(id, token) {
    const id_user = await getUserId(token);
    const incomeItems = await this.incomeModel.findOne({id_user});

    let items = incomeItems.items.filter(i => i._id.toString() !== id);
    let income = incomeItems.items.filter(i => i._id.toString() == id);
    incomeItems.items = items;

    if(incomeItems.save()) {
      this.__decreaseBalance(income[0].amount, token);
      return true;
    } else {
      return false;
    }
  }

  async saveBalance(balance, token) {
    const IUser = await user_model.findOne({token});
    IUser.balance = balance;

    if (IUser.save()) {
      return true;
    } else {
      return false;
    }
  }

  async __decreaseBalance (amount, token) {
    const IUser = await user_model.findOne({token});

    IUser.balance -= amount;

    if (IUser.save()) {
      return true;
    } else {
      return false;
    }
  }

  async __increaseBalance(amount, token) {
    const IUser = await user_model.findOne({token});

    const balance = Number(IUser.balance);

    IUser.balance = balance + Number(amount);

    if (IUser.save()) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Finance;
