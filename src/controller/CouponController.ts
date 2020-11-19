import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Coupon } from '../entity/Coupon'
import { Lot } from '../entity/Lot'
import  TokenVerifier from '../Middleware/TokenVerifier'

export class CouponController {
  private CouponRepository = getRepository(Coupon)
  private LotRepository = getRepository(Lot)
  private TokenVerifier = new TokenVerifier()
  
  private async findLot (request: Request, response: Response) {
    try {
      const dbResponse = await this.CouponRepository.find ({
        where: [
          { location_id: request.body.location_id },
          { shop_id: request.body.shop_id }
        ]
      })
      return dbResponse
    } catch {
      return response.status(404)
    }
  }

  private async updateLot (request: Request, response: Response) {
    try {
      const lot = await this.CouponRepository.findOne ({ where: { coupon_id: request.body.coupon_id } })
      const coupon = await this.CouponRepository.save ({
        ...lot,
        ...request.body
      })
      return coupon
    } catch {
      return response.status(404)
    }
  }

  //  POST /lot
  async CreateLot (request: Request, response: Response, next: NextFunction): Promise<Coupon | void | JSON> {
    const params = {
      description_lot_coupon: request.body.description_lot_coupon,
      original_price: request.body.original_price,
      discount_price: request.body.discount_price,
      expiration_date: request.body.expiration_date
    }
    const lot = await this.LotRepository.save(params)
    const coupon_array = []
    for (let i = 1; i <= request.body.coupon_numbers; i++) {
      const coupon_params = { 
        is_used: false,
        lot: lot
      }
      coupon_array.push(coupon_params)
    }
    return this.TokenVerifier.tokenMiddleware(response, this.TokenVerifier.verifyToken(request), await this.CouponRepository.save(coupon_array))
  }

  // GET /lot
  async GetLot (request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
   return this.TokenVerifier.tokenMiddleware(response, this.TokenVerifier.verifyToken(request), await this.findLot(request, response))  
  }

  // PUT /lot
  async UpdateLot (request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    return this.TokenVerifier.tokenMiddleware (response,
      this.TokenVerifier.verifyToken (request),
      await this.updateLot(request,response))
  }

  // DELETE /lot
  async DeleteLot (request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    return this.TokenVerifier.tokenMiddleware(response,
      this.TokenVerifier.verifyToken (request),
      await this.CouponRepository.find ({ where: { lot_id: request.body.lot_id }, take: 1 }))
  }

  // POST /coupon/SetCouponAsUsed
  async SetCouponAsUsed (request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    return this.TokenVerifier.tokenMiddleware (response, this.TokenVerifier.verifyToken(request), await this.updateLot(request, response))
  }
}
