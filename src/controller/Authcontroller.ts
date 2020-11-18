
import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Client } from '../entity/Client'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export default class AuthController {
  private ClientRepository = getRepository(Client);

  async login (request: Request, response: Response, next: NextFunction): Promise<void> {
    // Check if username and password are set
    const { username, password } = request.body
    console.log(username)
    if (!(username && password)) {
      response.status(400).send()
    }

    let user: Client
    try {
      user = await this.ClientRepository.findOneOrFail({ where: { username_client: username, password_client: password } })
      const token = jwt.sign(
        { userId: user.idClient, username: user.idClient },
        <string>config,
        { expiresIn: '1h' }
      )

      response.send(token)
    } catch (error) {
      response.status(401).send(error)
    }
  }

  async checkJwt (tokenToVerify: string): Promise<boolean> {
    // Get the jwt token from the head
    const token = <string>tokenToVerify

    const stringparsed = token.split('Bearer')
    let tokenfinal = stringparsed[1]

    tokenfinal = tokenfinal.split(' ').join('')

    try {
      await jwt.verify(tokenfinal, <string>config)
    } catch (error) {
      return false
    }

    return true
  };
}
