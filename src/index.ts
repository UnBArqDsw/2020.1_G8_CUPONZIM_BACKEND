import 'dotenv/config'
import express from 'express'
import { createConnection } from 'typeorm'
import { typeOrmConfig } from '../typeOrmConfig'

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!'
  })
})

const port = Number(process.env.PORT)
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
};

(async () => {
  await startServer()
  await createConnection(typeOrmConfig)
})()
