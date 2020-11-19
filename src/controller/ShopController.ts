import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Shop } from '../entity/Shop'
import  TokenVerifier from '../Middleware/TokenVerifier'

export class ShopController {
  private ShopRepository = getRepository(Shop);
  private TokenVerifier = new TokenVerifier()

  async all (request: Request, response: Response, next: NextFunction): Promise<Array<Shop>> {
    return this.TokenVerifier.tokenMiddleware(response, true, await this.ShopRepository.find())
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
