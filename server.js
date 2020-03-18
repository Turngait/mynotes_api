const express = require('express')
const { PORT } = require('./config/api')
const homeRouter = require('./routes/home')
const app = express()

app.use('/', homeRouter)

const start = (app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start(app)