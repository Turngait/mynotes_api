const {Router} = require('express')
const User = require('../models/User')
const user_model = require('../models/user_model')
const DTO = require('../models/dto')

const router = Router()

router.post('/add', async (req, res)=>{
  const response = new DTO()
  const {name, link, price, text, priority, group} = req.body
  const wlistItem = {
    name,
    text,
    price,
    priority,
    group,
    link
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
  delete iUser
})

router.get('/:token', async (req, res) => {
  const response = new DTO()
  const user = new User(user_model)

  const iUser = await user.getUser(req.params.token)

  if(iUser) {
    res.status(200)
    response.setData(iUser.wlist)
    response.setStatus(200)
    res.json(response.getResponse())
  } else {
    res.status(503)
    response.setStatus(503)
    response.setStatusText('Server error')
    res.json(response.getResponse())
  }
})

module.exports = router