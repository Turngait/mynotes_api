const express = require('express');
const cors = require('cors');

const { PORT } = require('./config/api');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/authorization');
const finRouter = require('./routes/finance');
const budgetRouter = require('./routes/budget');
const app = express();

app.use(cors());
app.use(express.json({
  inflate: true,
  strict: true,
  type: 'application/json'
}));

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/fin/', finRouter);
app.use('/budget/', budgetRouter);

const start = async (app) => {


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start(app);
