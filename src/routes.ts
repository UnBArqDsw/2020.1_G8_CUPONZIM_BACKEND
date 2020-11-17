import { ClientController } from './controller/ClientController'
import { CouponController } from './controller/CouponController'

export const Routes = [{
  method: 'get',
  route: '/all',
  controller: ClientController,
  action: 'all'
}, {
  method: 'get',
  route: '/jojozin',
  controller: ClientController,
  action: 'jojo'
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
},{
  method: 'post',
  route: '/coupon',
  controller: CouponController,
  action: 'CreateLot'
}]
