const {Router} = require('express')

const router = Router()

router.post('/add', (req, res)=>{
  console.log(req.body)
})

module.exports = router