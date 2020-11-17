import { getRepository, Any } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Location } from '../entity/Location'
import AuthController from './Authcontroller'
export class LocationController {
    private LocationRepository = getRepository(Location);



    verifyToken(request: Request) {
        const jwt = request.header['Authorization']
        let auth = new AuthController();
        const canUseRoute = auth.checkJwt(jwt);
        if (canUseRoute) return true;
        else return false;
    }

    tokenMiddleware(response: Response, hasToken: Boolean, dbResponse) {
        return hasToken ? dbResponse : response.status(401).send("Authorization falied")
    }

    async all(request: Request, response: Response, next: NextFunction): Promise<Array<Location>> {
        // return this.verifyToken(Request) ? response.json(this.LocationRepository.find()) : response.json({
        //     Error: "Authorization falied",
        //     status: 401
        // })
        return this.tokenMiddleware(response, this.verifyToken(request), await this.LocationRepository.find())
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<Location | undefined> {
        return this.LocationRepository.findOne(request.params.id)
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<Location | undefined> {
        console.log(request)
        //return this.LocationRepository.save(request.body)
        return this.tokenMiddleware(response, this.verifyToken(request), await this.LocationRepository.save(request.body))
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<void> {
        const LocationToRemove = await this.LocationRepository.findOne(request.params.id)
        await this.LocationRepository.remove(LocationToRemove)
    }
}
