const { Router } = require('express');

const User = require('../models/user');

const router = Router();

router.get('/', async (req, res) => {
  console.log('Auth server is working now.');
  res.json({isAlive: true});
})

router.post('/signin', async (req, res) => {
  const { email, pass } = req.body;
  const data = await User.signIn(email, pass);
  res.json({data});
});

router.post('/signup', async (req, res) => {
  const data = await User.signUp(req.body);
  res.json({data});
});

router.post('/userinfo', async (req, res) => {
  const id = await User.getUserIdByToken(req.body.token);
  const data = await User.getPublicData(id);
  res.json({data});
});

router.post('/setuserdata', async (req, res) => {
  const id = await User.getUserIdByToken(req.body.token);
  const status = await User.changeUserData({...req.body}, id);
  res.json({status});
});

router.post('/changepassword', async (req, res) => {
  console.log(req.body)
})

module.exports = router;
