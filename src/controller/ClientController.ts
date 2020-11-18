import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Client } from '../entity/Client'
import config from '../config/config'
import md5 from 'md5'

export class ClientController {
  private ClientRepository = getRepository(Client);

  async all (request: Request, response: Response, next: NextFunction): Promise<Array<Client>> {
    return this.ClientRepository.find()
  }

  async one (request: Request, response: Response, next: NextFunction): Promise<Client | undefined> {
    return this.ClientRepository.findOne(request.params.id)
  }

  async create (request: Request, response: Response, next: NextFunction): Promise<Client | undefined> {
    const object = { ...request.body, password_client: md5(request.body.password_client + config) }
    return this.ClientRepository.save(object)
  }

  async remove (request: Request, response: Response, next: NextFunction): Promise<void> {
    const ClientToRemove = await this.ClientRepository.findOne(request.params.id)
    await this.ClientRepository.remove(ClientToRemove)
  }
}
