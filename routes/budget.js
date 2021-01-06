const { Router } = require('express');

const FinController = require('../controllers/finance_controller');

const router = Router();

router.post('/add', async (req, res) => {
  FinController.addBudget(req, res);
});

router.post('/edit', async (req, res) => {
  FinController.editBudget(req, res);
})

module.exports = router;
