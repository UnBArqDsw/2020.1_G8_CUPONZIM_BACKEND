import { getRepository, Any } from 'typeorm'; import { NextFunction, Request, Response } from 'express'; import { Client } from '../entity/Client'

export class ClientController {
  private ClientRepository = getRepository(Client);

  async all (request: Request, response: Response, next: NextFunction): Promise<Array<Client>> {
    return this.ClientRepository.find()
  }

  async one (request: Request, response: Response, next: NextFunction): Promise<Client | undefined> {
    return this.ClientRepository.findOne(request.params.id)
  }

  async save (request: Request, response: Response, next: NextFunction): Promise<Client | undefined> {
    return this.ClientRepository.save(request.body)
  }

  async remove (request: Request, response: Response, next: NextFunction): Promise<void> {
    const ClientToRemove = await this.ClientRepository.findOne(request.params.id)
    await this.ClientRepository.remove(ClientToRemove)
  }
}
