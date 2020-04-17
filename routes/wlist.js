const {Router} = require('express')
const {addWlistValidators, addWlistGroupValidators} = require('../validators')
const WlistController = require('../controllers/wlist_controller')

const router = Router()

router.post('/add', addWlistValidators, async (req, res) => {
  WlistController.addWlistItem(req, res)
})

router.get('/:token', async (req, res) => {
  WlistController.getAllWlistItems(req, res)
})

router.delete('/:id/:token', async (req, res) => {
  WlistController.deleteWlistItem(req, res)
})

router.post('/addGroup', addWlistGroupValidators, async (req, res) => {
  WlistController.addGroup(req, res)
})

module.exports = router