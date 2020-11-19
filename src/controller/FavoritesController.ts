import { getRepository, Any } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Client } from '../entity/Client'
import { Shop } from '../entity/Shop'
import  TokenVerifier from '../Middleware/TokenVerifier'

export class FavoriteController {
  private ClientRepository = getRepository(Client);
  private ShopRepository = getRepository(Shop)
  private TokenVerifier = new TokenVerifier()

  async likeDeslike(request: Request, response: Response, next: NextFunction): Promise<Array<Client>> {
    const user = await this.ClientRepository.find({ where: { idClient: request.body.idClient } });
    const newUser = user;
    const store = await this.ShopRepository.find({ where: { idShop: request.body.idShop } });
    if (user && store) {
      if (newUser[0].favorite_shop_client) {
        if (newUser[0].favorite_shop_client.find((userShop) => userShop.idShop == store[0].idShop)) {
          console.log('deslike');
          newUser[0].favorite_shop_client = newUser[0].favorite_shop_client.filter(shop => shop.idShop != store[0].idShop)
        }
        else {
          console.log('like');
          newUser[0].favorite_shop_client.push(store[0]);
        }
      }
      else {
        console.log("primeiro like");
        newUser[0].favorite_shop_client = [store[0]];
      }
    }
    return this.TokenVerifier.tokenMiddleware(response,
      this.TokenVerifier.verifyToken(request),
      await this.ClientRepository.save({ ...user[0], ...newUser[0] }))
  }
}