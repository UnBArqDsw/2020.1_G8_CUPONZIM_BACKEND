import { getRepository, Any } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Location } from '../entity/Location'
import  TokenVerifier from '../Middleware/TokenVerifier'

export class LocationController {
  private LocationRepository = getRepository(Location);
  private TokenVerifier = new TokenVerifier()

  async all(request: Request, response: Response, next: NextFunction): Promise<Array<Location>> {
    return this.TokenVerifier.tokenMiddleware(response, this.TokenVerifier.verifyToken(request), await this.LocationRepository.find())
  }

  async one(request: Request, response: Response, next: NextFunction): Promise<Location | undefined> {
    try {
      return this.TokenVerifier.tokenMiddleware(response, this.TokenVerifier.verifyToken(request), this.LocationRepository.find({ where: { idLocation: request.params.id }, take: 1 }))
    }
    catch{
      return response.status(404)
    }
  }

  async create(request: Request, response: Response, next: NextFunction): Promise<Location | undefined> {
    return this.TokenVerifier.tokenMiddleware(response, this.TokenVerifier.verifyToken(request), await this.LocationRepository.save(request.body))
  }

  async remove(request: Request, response: Response, next: NextFunction): Promise<void> {
    const LocationToRemove = await this.LocationRepository.findOne(request.params.id)
    await this.LocationRepository.remove(LocationToRemove)
  }
}
