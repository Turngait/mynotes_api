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
  console.log(data)
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
  const id = await User.getUserIdByToken(req.body.token);
  const status = await User.changeUserPassword(req.body.pass.old, req.body.pass.new, id);
  res.json({status});
});

router.post('/recoverypassword', async (req, res) => {
  const id = await User.getUserByEmail(req.body.email);
  const status = await User.setPasswordInRecovery(req.body.pass, id);
  res.json({status});
});

router.post('/getuserid', async (req, res) => {
  const id = await User.getUserIdByToken(req.body.token);
  res.json({id});
});

module.exports = router;
