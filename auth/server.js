const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/api');
const mongoose = require('mongoose');
const {urlLocal} = require('./config/mongo');
const homeRouter = require('./routes/home');
const app = express();

app.use(cors());
app.use(express.json({
  inflate: true,
  strict: true,
  type: 'application/json'
}));

app.use('/', homeRouter);

const start = async (app) => {
  // TODO: Move to providers
  await mongoose.connect(urlLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Auth server successfully connected to the database');
  })

  app.listen(PORT, () => {
    console.log(`Auth server is running on port ${PORT}`)
  })
}

start(app);
