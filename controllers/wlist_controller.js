const DTO = require('../models/dto')
const user_model = require('../models/user_model')
const wgroups_model = require('../models/wgroups_model')
const {validationResult} = require('express-validator/check')
const Wlist = require('../models/Wlist');

class WlistController {

  static async addWlistItem (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.status(422);
      return res.json({errors});
    }

    const response = new DTO();
    const {name, link, price, text, priority, group, token} = req.body;
    const wlistItem = {
      name,
      text,
      price,
      priority,
      group,
      link,
      spent: 0,
      date: new Date().toISOString().slice(0,10)
    }
    const wlist = new Wlist(user_model, wgroups_model);

    if (wlist.addWlistItem(wlistItem, token)) {
      res.status(204);
      response.setData('Success');
      response.setStatus(204);
      res.json(response.getResponse());
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
      res.json(response.getResponse());
    }
  }

  static async deleteWlistItem (req, res) {
    const itemId = req.params.id;
    const token = req.params.token;
    const response = new DTO();
    const wlist = new Wlist(user_model, wgroups_model);
    if(wlist.deleteWlistitem(itemId, token)) {
      res.status(204);
      response.setStatus(204);
      res.json(response.getResponse());
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
      res.json(response.getResponse());
    }
  }

  static async getAllWlistItems(req, res) {
    const response = new DTO();
    const wlist = new Wlist(user_model, wgroups_model);
    const data = await wlist.getAllWlistItems(req.params.token);
    if(data) {
      res.status(200);
      response.setData({wlists: data.wlists, groups: data.groups});
      response.setStatus(200);
      res.json(response.getResponse());
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
      res.json(response.getResponse());
    }
  }

  static async addGroup(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.status(422);
      return res.json({errors});
    }

    const response = new DTO();
    const {title, token} = req.body
    const wlist = new Wlist(user_model, wgroups_model);
  
    if (wlist.addWlistGroup(title, token)) {
      res.status(204);
      response.setStatus(204);
      res.json(response.getResponse());
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
      res.json(response.getResponse());
    }
  }

  static async deleteWlistGroup(req, res) {
    const response = new DTO();
    const {id, token} =req.params;
    const wlist = new Wlist(user_model, wgroups_model);
    let result = await wlist.deleteWlistGroup(token, id);

    if(result) {
      res.status(204);
      response.setStatus(204);
    } else {
      res.status(503);
      response.setStatus(503);
      response.setStatusText('Server error');
    }
    res.json(response.getResponse())
  }
}

module.exports = WlistController;
