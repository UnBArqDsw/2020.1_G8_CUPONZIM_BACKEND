import { getRepository } from 'typeorm'; import { NextFunction, Request, Response } from 'express'; import { Client } from '../entity/Client'

export class ClientController {
   private ClientRepository = getRepository(Client);

   async all (request: Request, response: Response, next: NextFunction) {
     return this.ClientRepository.find()
   }

   async one (request: Request, response: Response, next: NextFunction) {
     return this.ClientRepository.findOne(request.params.id)
   }

   async save (request: Request, response: Response, next: NextFunction) {
     return this.ClientRepository.save(request.body)
   }

   async remove (request: Request, response: Response, next: NextFunction) {
     const ClientToRemove = await this.ClientRepository.findOne(request.params.id)
     await this.ClientRepository.remove(ClientToRemove)
   }

   async jojo (request: Request, response: Response, next: NextFunction) {
     return response.json({ pito: 'sim' })
   }
}
