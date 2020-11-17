import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Coupon } from '../entity/Coupon'
import AuthController from './Authcontroller'

export class CouponController {
  private CouponRepository = getRepository(Coupon)

  private verifyToken(request: Request) {
    const jwt = request.header['Authorization']
    const auth = new AuthController()
    const canUseRoute = auth.checkJwt(jwt)
    if (canUseRoute) return true
    else return false
  }

  private tokenMiddleware(response: Response, hasToken: boolean, dbResponse) {
    return hasToken ? dbResponse : response.status(401).send('Authorization failed')
  }
  
  private async findLot(request: Request, response: Response) {
    try {
      const dbResponse = await this.CouponRepository.find({
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

  private async updateLot(request: Request, response: Response) {
    try {
      const lot = await this.CouponRepository.findOne({ where: { coupon_id: request.body.coupon_id } })
      const coupon = await this.CouponRepository.save({
        ...lot,
        ...request.body
      })
      return coupon
    } catch {
      return response.status(404)
    }
  }

  //  POST /lot
  async CreateLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void | JSON> {
    return this.tokenMiddleware(response, this.verifyToken(request), await this.CouponRepository.save(request.body))
  }

  // GET /lot
  async GetLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
   return this.tokenMiddleware(response, this.verifyToken(request), await this.findLot(request, response))     
  }

  // PUT /lot
  async UpdateLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    return this.tokenMiddleware( response, 
      this.verifyToken(request), 
      await this.CouponRepository.find({ where: { lot_id: request.body.lot_id }, take: 1 }))
  }

  // DELETE /lot
  async DeleteLot(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    return this.tokenMiddleware(response,
      this.verifyToken(request),
      await this.CouponRepository.find({ where: { lot_id: request.body.lot_id }, take:1 }))
  }

  // POST /coupon/SetCouponAsUsed
  async SetCouponAsUsed(request: Request, response: Response, next: NextFunction): Promise<Coupon | void> {
    return this.tokenMiddleware(response, this.verifyToken(request),await this.updateLot(request, response))
  }
}
