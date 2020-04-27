const DTO = require('../models/dto');
const User = require('../models/User');
const user_model = require('../models/user_model');
const costGroup_model = require('../mongoose/costGroup_model');
const cost_model = require('../mongoose/cost_model');

class FinController {
  static async getAllCostForUser(req, res) {
    const {token} = req.params;
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
    if(!id_user) {
      res.status(403);
      res.json({Status: 'Access denied'});
    } else {
      const groups = await costGroup_model.findOne({id_user});
      const costs = await cost_model.findOne({id_user})

      if(groups && costs) {
        res.json({groups: groups.groups, costs: costs.items});
      } else {
        res.json({groups: [], costs: []});
      }
    }
  }

  static async addCost(req, res) {
    const response = new DTO();
    const user = new User(user_model);
    let result = null;
    const {token, cost} = req.body;
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

    if (id_user) {
      const Candidate = await cost_model.findOne({id_user});

      if (Candidate) {
        Candidate.items.push(Cost)
        result = Candidate.save();
      } else {
        const costItem = new cost_model({
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
        res.status(204);
        response.setStatus(204);
      } else {
        res.status(503);
        response.setStatus(503);
        response.setStatusText('Server error');
      }
    } else {
      res.status(403);
      response.setStatus(403);
    }

    res.json(response.getResponse());
  }

  static async editCost(req, res) {

  }

  static async deletCost(req, res) {
    const response = new DTO()
    const user = new User(user_model)
    const {id, token} =req.params;
    const id_user = await user.getUserId(token);

    if (id_user) {
      const CostItems = await cost_model.findOne({id_user});
      if (CostItems) {
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
          res.status(204)
          response.setStatus(204)
        } else {
          res.status(503)
          response.setStatus(503)
          response.setStatusText('Server error')
        }
      }
    } else {
      response.setStatus(403)
    }
    res.json(response.getResponse())
  }

  static async addCostGroup(req, res) {
    const response = new DTO()
    const {token, groupTitle} = req.body;
    let result = null;
    const user = new User(user_model);
    const id_user = await user.getUserId(token);
    const Candidate = await costGroup_model.findOne({id_user});

    if (Candidate) {
      const group = {title: groupTitle}
      Candidate.groups.push(group)
      result = await Candidate.save()
    } else {
      const costGroup = new costGroup_model({
        id_user,
        groups: [{
          title: groupTitle
        }]
      });
      result = costGroup.save()
    }

    if(result) {
      res.status(204)
      response.setStatus(204)
    } else {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
    }

    res.json(response.getResponse())
  }
}

module.exports = FinController