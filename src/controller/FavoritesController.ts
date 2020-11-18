import { getRepository, Any } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Client } from '../entity/Client'
import { Shop } from '../entity/Shop'
import AuthController from './Authcontroller'

export class FavoriteController {
    private ClientRepository = getRepository(Client);
    private ShopRepository = getRepository(Shop)

    private verifyToken(request: Request) {
        const jwt = request.headers.authorization
        let auth = new AuthController();
        const canUseRoute = auth.checkJwt(jwt);
        if (canUseRoute) return true;
        else return false;
    }

    private tokenMiddleware(response: Response, hasToken: Boolean, dbResponse) {
        return hasToken ? dbResponse : response.status(401).send("Authorization falied")
    }

    async likeDeslike(request: Request, response: Response, next: NextFunction): Promise<Array<Client>> {
        let user = await this.ClientRepository.find({ where: { idClient: request.body.idClient } });
        let store = await this.ShopRepository.find({ where: { idShop: request.body.idShop } });
        console.log(user);
        console.log(store);
        console.log(user[0].favorite_shop_client);
        if (user && store) {
            if(user[0].favorite_shop_client) user[0].favorite_shop_client.includes(store[0]) ? user[0].favorite_shop_client = user[0].favorite_shop_client.filter(shop => shop != store[0]) : user[0].favorite_shop_client.push(store[0]);
            else user[0].favorite_shop_client = [store[0]];
        }
        console.log(await this.ClientRepository.save(user[0]));
        return this.tokenMiddleware(response, true, await this.ClientRepository.save(user[0]))
    }
}