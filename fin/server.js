const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/api');
const mongoose = require('mongoose');
const {urlLocal} = require('./config/mongo');
const homeRouter = require('./routes/home');
const costRouter = require('./routes/cost');
const incomeRouter = require('./routes/income');
const app = express();

app.use(cors());
app.use(express.json({
  inflate: true,
  strict: true,
  type: 'application/json'
}));

app.use('/', homeRouter);
app.use('/costs', costRouter);
app.use('/incomes', incomeRouter);

const start = async (app) => {
  // TODO: Move to providers
  await mongoose.connect(urlLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Fin server successfully connected to the database');
  })

  app.listen(PORT, () => {
    console.log(`Fin server is running on port ${PORT}`)
  })
}

start(app);
