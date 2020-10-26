import 'dotenv/config'
import express, { json, Request, Response } from 'express'
import 'reflect-metadata'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import { typeOrmConfig } from '../typeOrmConfig'
import { Client } from './entity/Client'
import { Routes } from './routes'

// const app = express()

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello World!'
//   })
// })

// const port = Number(process.env.PORT)
// const startServer = async () => {
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`)
//   })
// };

// (async () => {
//   await startServer()
//   await createConnection(typeOrmConfig).then(async connection => {
//     const client = new Client()
//     client.username_client = 'Teste'
//     client.password_client = 'teste'
//     client.avatar_img_client = 'link'
//     client.cellphone_number_client = 61996
//     await connection.manager.save(client)
//     console.log(client)
//     const clients = await connection.manager.find(Client)
//     console.log(clients)
//   }).catch(error => console.log(error))
// })()

createConnection().then(async connection => {
  const app = express()
  app.use(bodyParser.json())
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any)())[route.action](req, res, next)
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
      } else if (result !== null && result !== undefined) {
        console.log(result)
      }
    })
  })

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hello World!'
    })
  })
  app.listen(3333)
  console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results')
}).catch(error => console.log(error))
