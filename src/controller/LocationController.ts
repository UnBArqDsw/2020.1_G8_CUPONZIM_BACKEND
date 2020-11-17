import { getRepository, Any } from 'typeorm'; import { NextFunction, Request, Response } from 'express'; import { Location } from '../entity/Location'

export class LocationController {
  private LocationRepository = getRepository(Location);

  async all (request: Request, response: Response, next: NextFunction): Promise<Array<Location>> {
    return this.LocationRepository.find()
  }

  async one (request: Request, response: Response, next: NextFunction): Promise<Location | undefined> {
    return this.LocationRepository.findOne(request.params.id)
  }

  async create (request: Request, response: Response, next: NextFunction): Promise<Location | undefined> {
    console.log(request)
    return this.LocationRepository.save(request.body)
  }

  async remove (request: Request, response: Response, next: NextFunction): Promise<void> {
    const LocationToRemove = await this.LocationRepository.findOne(request.params.id)
    await this.LocationRepository.remove(LocationToRemove)
  }
}
