import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Shop } from '../entity/Shop'
import { Location } from '../entity/Location'
import TokenVerifier from '../Middleware/TokenVerifier'
import { ShopOwner } from '../entity/ShopOwner'

export class ShopController {
  private ShopRepository = getRepository(Shop);
  private LocationRepository = getRepository(Location);
  private ShopOwnerRepository = getRepository(ShopOwner);
  private TokenVerifier = new TokenVerifier()

  async all (request: Request, response: Response, next: NextFunction): Promise<Array<Shop>> {
    return TokenVerifier.getInstance().tokenMiddleware(response, true, await this.ShopRepository.find())
  }

  async one (request: Request, response: Response, next: NextFunction): Promise<Shop | undefined> {
    return this.ShopRepository.findOne(request.params.id)
  }

  async create (request: Request, response: Response, next: NextFunction): Promise<Shop | undefined> {
    try {
      const location = await this.LocationRepository.find({ where: { idLocation: request.body.idLocation } })
      const owner = await this.ShopOwnerRepository.find({ where: { idShopOwner: request.body.idShopOwner } })
      console.log(location, owner)
      console.log(owner, owner[0])

      const shp = new Shop()

      shp.name_shop = request.body.name_shop
      shp.description_shop = request.body.description_shop
      shp.long_location = request.body.long_location
      shp.type_location = request.body.type_location

      const shopdone = await this.ShopRepository.save(shp)

      owner[0].shops.push(shopdone)
      location[0].shops.push(shopdone)
      await this.ShopOwnerRepository.save(owner[0])
      await this.LocationRepository.save(location[0])
      return shopdone
    } catch (er) {
      return response.send(404).json(er)
    }
  }

  async remove (request: Request, response: Response, next: NextFunction): Promise<void> {
    const shopToRemove = await this.ShopRepository.findOne(request.params.id)
    await this.ShopRepository.remove(shopToRemove)
  }
}
