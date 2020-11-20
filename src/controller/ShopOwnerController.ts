import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { ShopOwner } from '../entity/ShopOwner'
import config from '../config/config'
import md5 from 'md5'

export class ShopOwnerController {
  private ShopOwnerRepository = getRepository(ShopOwner);

  async all (request: Request, response: Response, next: NextFunction): Promise<Array<ShopOwner>> {
    return this.ShopOwnerRepository.find()
  }

  async one (request: Request, response: Response, next: NextFunction): Promise<ShopOwner | undefined> {
    return this.ShopOwnerRepository.findOne(request.params.id)
  }

  async create (request: Request, response: Response, next: NextFunction): Promise<any> {
    console.log("adadvewa");
    try {
      const object = { ...request.body, password_shop: md5(request.body.password_shop + config) }
      return await this.ShopOwnerRepository.save(object)
    } catch (error) {
      return response.json({
        Error: 'Unique Constraint',
        status: 403
      })
    }
  }

  async remove (request: Request, response: Response, next: NextFunction): Promise<void> {
    const ShopOwnerToRemove = await this.ShopOwnerRepository.findOne(request.params.id)
    await this.ShopOwnerRepository.remove(ShopOwnerToRemove)
  }
}
