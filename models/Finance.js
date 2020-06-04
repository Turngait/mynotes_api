const DAO = require('./dao');
const User = require('./User');
const user_model = require('./user_model');

class Finance extends DAO {
  constructor (costModel, costGroupModel, incomeModel = null) {
    super('Cost');
    this.costModel = costModel;
    this.costGroupModel = costGroupModel;
    this.incomeModel = incomeModel;
  }
  
  async getAllCostForUser(token) {
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
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
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
    const groups = await this.costGroupModel.findOne({id_user});
    let costs = await this.costModel.findOne({id_user});
    costs = costs.items.filter((item) => item.period === period);

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

  async addCost(token, cost) {
    let result = null;
    const user = new User(user_model);
    const id_user = await user.getUserId(token);

    const Cost = {
      title: cost.title,
      descrition: cost.descrition,
      amount: cost.amount,
      id_group: cost.group,
      id_wlist_item: cost.wlistItem,
      period: String(cost.date).substring(0, 7),
      date: String(cost.date)
    }

    const Candidate = await this.costModel.findOne({id_user});

    if (Candidate) {
      Candidate.items.push(Cost)
      result = Candidate.save();
    } else {
      const costItem = new this.costModel({
        id_user,
        items:[
          Cost
        ],
        createdAt: new Date().toISOString().slice(0,10)
      });
      result = costItem.save();
    }

    if (result) {
      this.updateWlistItemSpent(cost, user, token);
    }

    return result;

  }

  async addCostGroup(token, groupTitle) {
    let result = null;
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
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

  async deleteCost(token, id) {
    const user = new User(user_model)
    const id_user = await user.getUserId(token);
    const CostItems = await this.costModel.findOne({id_user});
    this.deleteSpentCostFromWlistItem(CostItems, id, user, token);

    let items = CostItems.items.filter(i => i._id.toString() !== id);
    CostItems.items = items;

    if(CostItems.save()) {
      return true;
    } else {
      return false;
    }
  }

  async deleteCostGroup(token, id) {
    const user = new User(user_model)
    const id_user = await user.getUserId(token);
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

  async updateWlistItemSpent(cost, user, token) {
    if (cost.wlistItem.toString() !== '0') {
      const id_wlist = cost.wlistItem;
      const IUser = await user.getUser(token);
      const wlistItems = IUser.wlist;

      if(wlistItems) {
        for(let item of wlistItems) {
          if (item._id.toString() === id_wlist.toString()) {
            item.spent = Number(item.spent) + Number(cost.amount);
          }
        }
      }

      IUser.wlist = wlistItems;
      IUser.save();
    }
  }

  async deleteSpentCostFromWlistItem(costs, id, user, token) {
    for (let item of costs.items) {
      if (item._id.toString() === id) {
        if (item.id_wlist_item.toString() !== '0') {
          const IUser = await user.getUser(token);
          const id_wlist = item.id_wlist_item.toString();
          const wlists = IUser.wlist

          for (let wlist of wlists) {
            if(wlist._id.toString() === id_wlist) {
              wlist.spent = Number(wlist.spent) - Number(item.amount)
            }
          }
          IUser.wlist = wlists;
          IUser.save()
        }
      }
    }
  }

  async getIncomesByPeriod(period, token) {
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
    let incomes = await this.incomeModel.findOne({id_user});
    incomes = incomes.items.filter((item) => item.period === period);

    incomes.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });

    const periods = new Set();
    incomes.map((item) => {
      periods.add(item.date)
    })
    const items = [];
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

    return items;
  }

  async addIncome(income, token) {
    let result = null;
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
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
    return result;
  }
}

module.exports = Finance;
