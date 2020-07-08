const { Router } = require('express')
const {validationResult} = require('express-validator/check')
const {loginValidators, signUpValidators} = require('../validators')
const AuthController = require('../controllers/auth_controller')

const router = Router()

router.get('/', (req, res) => {
  res.status(403)
});

router.get('/user/:token', (req, res) => {
  AuthController.getUserData(req, res)
});

router.post('/user/setdata', (req, res) => {
  AuthController.saveNewUserData(req, res)
});

router.post('/user/changepassword', (req, res) => {
  AuthController.changeNewPassword(req, res)
});

router.post('/signin', loginValidators, async (req, res) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    AuthController.signIn(req, res)
  } else {
    res.status(422)
    res.json({errors})
  }
});

router.post('/signup', signUpValidators, async (req, res) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    AuthController.signUp(req, res)
  } else {
    res.status(422)
    res.json({errors})
  }
});

router.post('/recovery', async(req, res) => {
  AuthController.sendRecoveryMessage(req, res);
})

router.post('/setnewpass', async(req, res) => {
  AuthController.setNewPass(req, res);
})

module.exports = router
