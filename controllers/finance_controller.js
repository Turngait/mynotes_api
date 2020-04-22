const DTO = require('../models/dto');
const User = require('../models/User');
const user_model = require('../models/user_model');
const costGroup_model = require('../mongoose/costGroup_model');

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

      if(groups) {
        res.json({groups: groups.groups});
      } else {
        res.json({groups: []});
      }
    }
  }

  static async addCost(req, res) {
    console.log(req.body)

    res.json({test: true})
  }

  static async editCost(req, res) {

  }

  static async deletCost(req, res) {
    
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