import 'dotenv/config'
import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { typeOrmConfig } from '../typeOrmConfig'
import { Client } from "./entity/Client";

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
  await createConnection(typeOrmConfig).then(async connection => {
    const client = new Client()
    client.username_client = "Teste"
    client.password_client = "teste"
    client.avatar_img_client = "link"
    client.cellphone_number_client = 61996
    await connection.manager.save(client);
    console.log(client)
    const clients = await connection.manager.find(Client);
    console.log(clients)
  }).catch(error => console.log(error));
})()
