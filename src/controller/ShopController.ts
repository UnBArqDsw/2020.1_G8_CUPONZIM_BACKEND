import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Shop } from '../entity/Shop'
import AuthController from './Authcontroller'

export class ShopController {
    private ShopRepository = getRepository(Shop);

    async verifyToken (request: Request): Promise<boolean> {
      const jwt = request.headers.authorization

      const auth = new AuthController()
      const canUseRoute = await auth.checkJwt(<string>jwt)
      if (canUseRoute) return true
      else return false
    }

    tokenMiddleware (response: Response, hasToken: boolean, dbResponse: any): any {
      return hasToken ? dbResponse : response.json({
        Error: 'Authorization falied',
        status: 401
      })
    }

    async all (request: Request, response: Response, next: NextFunction): Promise<Array<Shop>> {
      return this.tokenMiddleware(response, await this.verifyToken(request), await this.ShopRepository.find())
    }

    async one (request: Request, response: Response, next: NextFunction): Promise<Shop | undefined> {
      return this.ShopRepository.findOne(request.params.id)
    }

    async create (request: Request, response: Response, next: NextFunction): Promise<Shop | undefined> {
      console.log(request)
      return this.ShopRepository.save(request.body)
    }

    async remove (request: Request, response: Response, next: NextFunction): Promise<void> {
      const shopToRemove = await this.ShopRepository.findOne(request.params.id)
      await this.ShopRepository.remove(shopToRemove)
    }
}
