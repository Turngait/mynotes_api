const costModel = require('./mongoose/cost');
const costGroupModel = require('./mongoose/costGroup');
const {normalizeCosts} = require('./services');

class Costs {
  static async getCostsForPeriod(period, id_user) {
    const costs =  await costModel.find({id_user, period}) || [];
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
      descrition: cost.descrition,
      amount: cost.amount,
      id_group: cost.group,
      date: cost.date,
      createdAt: new Date()
    });

    try {
      newCost.save();
      return 204;
    } catch (error) {
      console.log(error)
      return 500;
    }
  }

  static async deleteCost(id_cost, id_user) {
    try {
      const cost = await costModel.findOne({_id: id_cost, id_user});
      const amount = cost.amount;
      if(cost) {
        await costModel.deleteOne({_id: id_cost, id_user});
        return {status: 204, amount};
      } else {
        return 403;
      }
    } catch (err) {
      console.log(err)
      return 500;
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
        costGroup.save();
      }

      return 204;
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
}

module.exports = Costs;
