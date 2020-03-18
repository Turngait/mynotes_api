const { Router } = require('express')
var mongoose = require('mongoose')
const { urlLocal, urlAtlas } = require('../config/mongo')


const router = Router()

router.get('/', async (req, res) => {

  await mongoose.connect(urlAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('successfully connected to the database');
    res.status(200)
    res.send('MyNotes API1')
  }).catch(err => {
    console.log(err)
    console.log('error connecting to the database');
  })


})


module.exports = router