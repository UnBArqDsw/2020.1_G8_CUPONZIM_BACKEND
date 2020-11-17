import { ClientController } from './controller/ClientController'
import { CouponController } from './controller/CouponController'
import AuthController from './controller/Authcontroller'

export const Routes = [{
  method: 'get',
  route: '/all',
  controller: ClientController,
  action: 'all'
}, {
  method: 'post',
  route: '/login',
  controller: AuthController,
  action: 'login'
},
{
  method: 'get',
  route: '/users/:id',
  controller: ClientController,
  action: 'one'
}, {
  method: 'post',
  route: '/users',
  controller: ClientController,
  action: 'create'
}, {
  method: 'delete',
  route: '/users/:id',
  controller: ClientController,
  action: 'remove'
}, {
  method: 'get',
  route: '/coupon',
  controller: CouponController,
  action: 'GetLot'
}, {
  method: 'post',
  route: '/coupon',
  controller: CouponController,
  action: 'CreateLot'
}, {
  method: 'put',
  route: '/coupon',
  controller: CouponController,
  action: 'UpdateLot'
}, {
  method: 'delete',
  route: '/coupon',
  controller: CouponController,
  action: 'DeleteLot'
}, {
  method: 'post',
  route: '/coupon/SetCouponAsUsed',
  controller: CouponController,
  action: 'SetCouponAsUsed'
}]
