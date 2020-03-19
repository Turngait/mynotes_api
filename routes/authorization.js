const { Router } = require('express')
const User = require('../models/user')
const DTO = require('../models/dto')

const router = Router()

router.get('/', (req, res) => {
  res.status(403)
})

router.post('/signin', (req, res) => {
  const response = new DTO()
  const user = new User(req.body.email)
  const token = user.fakeSignIn(req.body.pass)
  if(token) {
    res.status(200)
    response.setData({'token': token})
    response.setStatus(200)
    res.json(response.getResponse())
  }else {
    res.status(403)
    response.setData({'token': false})
    response.setStatus(403)
    res.json(response.getResponse())
  }
})

router.post('/signup', (req, res) => {
  console.log(req.body)
})

module.exports = router
