const express = require('express')
const cors = require('cors')
const { PORT } = require('./config/api')
const homeRouter = require('./routes/home')
const authRouter = require('./routes/authorization')
const wlistRouter = require('./routes/wlist')
const finRouter = require('./routes/finance')
const mongoose = require('mongoose')
const {urlLocal} = require('./config/mongo')
const app = express()

app.use(cors())
app.use(express.json({
  inflate: true,
  strict: true,
  type: 'application/json'
}))

app.use('/', homeRouter)
app.use('/auth', authRouter)
app.use('/wlist', wlistRouter)
app.use('/fin/', finRouter)

const start = async (app) => {
  await mongoose.connect(urlLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('successfully connected to the database');
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start(app)
