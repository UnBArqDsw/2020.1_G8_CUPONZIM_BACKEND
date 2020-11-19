
import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Client } from '../entity/Client'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import md5 from 'md5'

export default class AuthController {
  private ClientRepository = getRepository(Client);

  async login (request: Request, response: Response, next: NextFunction): Promise<void> {
    // Check if username and password are set
    const { username, password } = request.body
    const pass = md5(password + config)
    if (!(username && password)) {
      response.status(400).send({ Erro: 'É necessário fornecer a senha e o username para o login!' })
    }

    let user: Client
    try {
      user = await this.ClientRepository.findOneOrFail({ where: { username_client: username, password_client: pass } })
      const token = jwt.sign(
        { userId: user.idClient, username: user.idClient },
        <string>config,
        { expiresIn: '1h' }
      )

      response.status(200).send({ Success: true, Token: token })
    } catch (error) {
      response.status(401).send({ Erro: 'Não foi possível encontrar usuário com as credenciais fornecidas ' })
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
