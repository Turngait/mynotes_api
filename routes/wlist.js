const {Router} = require('express')
const {addWlistValidators, addWlistGroupValidators} = require('../validators')
const WlistController = require('../controllers/wlist_controller')

const router = Router()

router.post('/item/add', addWlistValidators, async (req, res) => {
  WlistController.addWlistItem(req, res)
})

router.get('/:token', async (req, res) => {
  WlistController.getAllWlistItems(req, res)
})

router.delete('/item/:id/:token', async (req, res) => {
  WlistController.deleteWlistItem(req, res)
})

router.post('/group/add', addWlistGroupValidators, async (req, res) => {
  WlistController.addGroup(req, res);
})

router.delete('/group/delete/:id/:token', async (req, res) => {
  WlistController.deleteWlistGroup(req, res);
})

module.exports = router;
