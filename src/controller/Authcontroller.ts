
import { getRepository, Any } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Client } from '../entity/Client'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export default class AuthController {
    private ClientRepository = getRepository(Client);

    async login (request: Request, response: Response, next: NextFunction): Promise<void> {
      // Check if username and password are set
      const { username, password } = request.body
      if (!(username && password)) {
        response.status(400).send()
      }

      let user: Client
      try {
        user = await this.ClientRepository.findOneOrFail({ where: { username } })
      } catch (error) {
        response.status(401).send()
      }

      // Check if encrypted password match

      // Sing JWT, valid for 1 hour
      const token = jwt.sign(
        { userId: user.idClient, username: user.idClient },
        config,
        { expiresIn: '1h' }
      )

      // Send the jwt in the response
      response.send(token)
    }

    checkJwt (tokenToVerify:string) :boolean {
      // Get the jwt token from the head
      const token = <string>tokenToVerify
      let jwtPayload

      // Try to validate the token and get data
      try {
        jwtPayload = <any>jwt.verify(token, <string>config)
        console.log(jwtPayload)
      } catch (error) {
        // If token is not valid, respond with 401 (unauthorized)

        return false
      }

      // The token is valid for 1 hour
      // We want to send a new token on every request
      //   const { userId, username } = jwtPayload
      //   const newToken = jwt.sign({ userId, username }, <string> config, {
      //     expiresIn: '1h'
      //   })
      //   res.setHeader('token', newToken)
      return true
    };
}
