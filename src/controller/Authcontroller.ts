
import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Client } from '../entity/Client'
import { ShopOwner } from '../entity/ShopOwner'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import md5 from 'md5'

export default class AuthController {
  private ClientRepository = getRepository(Client);
  private OwnerRepository = getRepository(ShopOwner);
  async login (request: Request, response: Response, next: NextFunction): Promise<void> {
    // Check if username and password are set
    const { username, password } = request.body
    const pass = md5(password + config)
    if (!(username && password)) {
      response.status(400).send({ Erro: 'É necessário fornecer a senha e o username para o login!' })
    }

    let user: Client
    let shopOwner: ShopOwner
    try {
      if (request.body.isShopOwner) {
        shopOwner = await this.OwnerRepository.findOneOrFail({ where: { username_shop: username, password_shop: pass } })
        const token = await jwt.sign(
          { shopOwnerId: shopOwner.idShopOwner, username: shopOwner.username_shop },
          <string>config,
          { expiresIn: '10h' }
        )
        response.status(200).send({ Success: true, Token: token })
      } else {
        user = await this.ClientRepository.findOneOrFail({ where: { username_client: username, password_client: pass } })

        const token = await jwt.sign(
          { userId: user.idClient, username: user.idClient },
          <string>config,
          { expiresIn: '10h' }
        )

        response.status(200).send({ Success: true, Token: token })
      }
    } catch (error) {
      console.log(error)
      response.status(401).send({ Erro: 'Não foi possível encontrar usuário com as credenciais fornecidas ', error })
    }
  }

  async checkJwt (tokenToVerify: string): Promise<any> {
    try {
      const token = <string>tokenToVerify

      const stringparsed = token.split('Bearer')
      let tokenfinal = stringparsed[1]

      tokenfinal = tokenfinal.split(' ').join('')

      await jwt.verify(tokenfinal, <string>config)
      return (jwt.decode(tokenfinal))
    } catch (error) {
      return false
    }
  };
}
