const DTO = require('../models/dto')
const User = require('../models/User')
const user_model = require('../models/user_model')
const wgroups_model = require('../models/wgroups_model')
const {validationResult} = require('express-validator/check')

class WlistController {

  static async addWlistItem (req, res) {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      res.status(422)
      return res.json({errors})
    }

    const response = new DTO()
    const {name, link, price, text, priority, group} = req.body
    const wlistItem = {
      name,
      text,
      price,
      priority,
      group,
      link,
      date: new Date().toISOString().slice(0,10)
    }

    const {token} = req.body
    const user = new User(user_model)
    const iUser = await user.getUser(token)
    iUser.wlist.push(wlistItem)
    if (iUser.save()) {
      res.status(204)
      response.setData('Success')
      response.setStatus(204)
      res.json(response.getResponse())
    } else {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
      res.json(response.getResponse())
    }
  }

  static async deleteWlistItem (req, res) {
    const itemId = req.params.id
    const token = req.params.token
    const response = new DTO()
    const user = new User(user_model)
    const iUser = await user.getUser(token)
    if (iUser) {
      let items = iUser.wlist
      items = items.filter(i => i._id.toString() !== itemId)
      iUser.wlist = items

      if(iUser.save()) {
        res.status(204)
        response.setStatus(204)
        res.json(response.getResponse())
      } else {
        res.status(503)
        response.setStatus(503)
        response.setStatusText('Server error')
        res.json(response.getResponse())
      }
    } else {
      res.status(403)
      response.setStatus(403)
      response.setStatusText('Access denied')
      res.json(response.getResponse())
    }
  }

  static async getAllWlistItems(req, res) {
    const response = new DTO()
    const user = new User(user_model)
  
    const iUser = await user.getUser(req.params.token)
  
    if(iUser) {
  
      const wlistGroup = await wgroups_model.findOne({id_user: iUser._id})
      res.status(200)
      response.setData({wlists: iUser.wlist, groups: wlistGroup.groups})
      response.setStatus(200)
      res.json(response.getResponse())
    } else {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
      res.json(response.getResponse())
    }
  }

  static async addGroup(req, res) {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      res.status(422)
      return res.json({errors})
    }

    const response = new DTO()
    const user = new User(user_model)
    const {title, token} = req.body
    const iUser = await user.getUser(token)
    const Candidate = await wgroups_model.findOne({id_user: iUser._id})
    let result = null
  
    if (Candidate) {
      const group = {title}
      Candidate.groups.push(group)
      result = await Candidate.save()
    } else {
      const Wgroup = new wgroups_model({
        id_user: iUser._id,
        groups: [{title}]
      })
      result = await Wgroup.save()
    }
  
    if (result) {
      res.status(204)
      response.setStatus(204)
      res.json(response.getResponse())
    } else {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
      res.json(response.getResponse())
    }
  }
}

module.exports = WlistController