const DAO = require('./dao');
const User = require('./User');
const user_model = require('./user_model');

class Finance extends DAO {
  constructor (costModel, costGroupModel) {
    super('Cost');
    this.costModel = costModel;
    this.costGroupModel = costGroupModel;
  }
  
  async getAllCostForUser(token) {
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
    if (id_user) {
      const groups = await this.costGroupModel.findOne({id_user});
      const costs = await this.costModel.findOne({id_user});
      return {groups, costs};
    } else {
      return {groups: [], costs: []};
    }
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
      period: new Date().toISOString().slice(0,7),
      date: new Date().toISOString().slice(0,10)
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

    for (let item of CostItems.items) {
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

    let items = CostItems.items.filter(i => i._id.toString() !== id);
    CostItems.items = items;

    if(CostItems.save()) {

      return true;
    } else {
      return false;
    }

  }
}

module.exports = Finance;
