const express = require('express')
const cors = require('cors')
const { PORT } = require('./config/api')
const homeRouter = require('./routes/home')
const authRouter = require('./routes/authorization')
const app = express()

app.use(cors())
app.use(express.json({
  inflate: true,
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}))

app.use('/', homeRouter)
app.use('/auth', authRouter)

const start = (app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start(app)
