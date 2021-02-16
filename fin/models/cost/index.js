const costModel = require('./mongoose/cost');
const costGroupModel = require('./mongoose/costGroup');
const {normalizeCosts, normalizeGroupData} = require('./services');

class Costs {
  static async getCostsForPeriod(period, id_user) {
    const costs =  await costModel.find({id_user, period}).sort('-date') || [];
    const groups = await costGroupModel.findOne({id_user}) || [];
    return {costs: normalizeCosts(costs), groups: groups.groups || []};
  }

  static async getCostsForGroupAndPeriod(period, id_group, id_user) {
    const costs =  await costModel.find({id_user, id_group, period}) || [];
    const groups = await costGroupModel.findOne({id_user}) || [];
    return {costs: normalizeCosts(costs), groups: groups.groups || []};
  }

  static async addCost(cost, id_user) {
    const newCost = new costModel({
      id_user,
      period: String(cost.date).substring(0, 7),
      title: cost.title,
      description: cost.description,
      id_budget: cost.budget,
      amount: cost.amount,
      id_group: cost.group,
      date: cost.date,
      createdAt: new Date()
    });

    try {
      newCost.save();
      return 201;
    } catch (error) {
      console.log(error)
      return 500;
    }
  }

  static async deleteCost(id_cost, id_user) {
    try {
      const cost = await costModel.findOne({_id: id_cost, id_user});
      const amount = cost.amount;
      const id_budget = cost.id_budget;
      if(cost) {
        await costModel.deleteOne({_id: id_cost, id_user});
        return {status: 204, amount, id_budget};
      } else {
        return {status: 403, amount: null, id_budget: null};
      }
    } catch (err) {
      console.log(err)
      return {status: 500, amount: null, id_budget: null};
    }
  }

  static async addGroup(group_title, id_user) {
    try {
      const Candidate = await costGroupModel.findOne({id_user});

      if (Candidate) {
        const group = {title: group_title}
        Candidate.groups.push(group)
        await Candidate.save();
      } else {
        const costGroup = new costGroupModel({
          id_user,
          groups: [{
            title: group_title
          }]
        });
        await costGroup.save();
      }

      return 201;
    } catch(error) {
      console.log(error);
      return 500;
    }
  }

  static async deleteGroup(id, id_user) {
    try {
      const costGroups = await costGroupModel.findOne({id_user});
      if(costGroups) {
        costGroups.groups = costGroups.groups.filter(i => i._id.toString() !== id);
        costGroups.save();
        return 204;
      } else {
        return 403;
      }
    } catch(err) {
      console.log(err)
      return 500;
    }
  }
  
  static async getGroupData(id_user, period) {
    const data = await Costs.getCostsForPeriod(period, id_user);
    return normalizeGroupData(data);
  }

  static async getCostsAmountForPeriod(id_user, period) {
    const costs = await costModel.find({id_user, period}) || [];
    let costsForPeriod = 0;
    if (costs.length > 0) {
      for (let cost of costs) {
        costsForPeriod += cost.amount;
      }
    }
    return costsForPeriod;
  }
  
}


module.exports = Costs;
