import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Coupon } from '../entity/Coupon'
import AuthController from './Authcontroller'

export class CouponController {
  private CouponRepository = getRepository(Coupon)

  verifyToken(request: Request) {
    const jwt = request.header['Authorization']
    let auth = new AuthController();
    const canUseRoute = auth.checkJwt(jwt);
    if (canUseRoute) return true;
    else return false;
  }

  //  POST /lot
  async CreateLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void | JSON> {
    const canUseRoute =  this.verifyToken(request)
    if (canUseRoute) {
      let params = {
        lot: await this.CouponRepository.save(request.body),
        status: 200
      }
       response.status(200).send(params)
    } else {
      let params = {
        Error: "Authorization falied",
        status: 401
      }
      response.status(401).send(params)
    }
  }

  // GET /lot
  async GetLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    const canUseRoute =  this.verifyToken(request)
    if (canUseRoute) {
      let params = {
        lot: await this.CouponRepository.find({
          where: [
            { location_id: request.body.location_id },
            { shop_id: request.body.shop_id }
          ]
        }),
        status: 200
      }
      response.status(200).send(params)
    } else {
      let params = {
        Error: "Authorization falied",
        status: 401
      }
      response.status(401).send(params)
    }
  }

  // PUT /lot
  async UpdateLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    const canUseRoute = this.verifyToken(request)
    const lot = await this.CouponRepository.findOne({ where: { lot_id: request.body.lot_id } })

    if (canUseRoute) {
      let params = {
        lot: await this.CouponRepository.save({
          ...lot,
          ...request.body
        }),
        status: 200
      }
      response.status(200).send(params)
    } else {
      let params = {
        Error: "Authorization falied",
        status: 401
      }
      response.status(401).send(params)
    }
  }

  // DELETE /lot
  async DeleteLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    const canUseRoute = this.verifyToken(request)
    const lotToRemove = await this.CouponRepository.findOne({ where: { lot_id: request.body.lot_id } })
    if (canUseRoute) {
      let params = {
        lot: this.CouponRepository.remove(lotToRemove),
        status: 200
      }
      response.status(200).send(params)
    } else  {
      let params = {
        Error: "Authorization falied",
        status: 401
      }
      response.status(401).send(params)
    }
  }


  // POST /coupon/SetCouponAsUsed
  async SetCouponAsUsed(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    const canUseRoute = this.verifyToken(request)
    
    const lot = await this.CouponRepository.findOne({ where: { coupon_id: request.body.coupon_id } })
    let responseBody = {
      coupon: await this.CouponRepository.save({
        ...lot,
        ...request.body
      }),
      status: 200
    }
    if (lot) {
      response.status(200).send(responseBody)
    } else return; 
  }

}
