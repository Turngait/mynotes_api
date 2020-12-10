const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  console.log('Fin server is working now.');
  res.json({isAlive: true});
})

module.exports = router;
