import { getRepository, Any } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Client } from '../entity/Client'
import AuthController from './Authcontroller'

export class FavoriteController {
    private FavoriteRepository = getRepository(Client);

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

    async like(request: Request, response: Response, next: NextFunction): Promise<Array<Client>> {
        this.FavoriteRepository.find({where:{idClient:request.body.idClient}})
        return this.tokenMiddleware(response, this.verifyToken(request), await this.FavoriteRepository.find())
    }
}