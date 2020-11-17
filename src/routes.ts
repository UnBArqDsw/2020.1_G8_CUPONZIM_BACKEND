import { ClientController } from './controller/ClientController'
import AuthController from './controller/Authcontroller'
import { ShopController } from './controller/ShopController'

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
  method: 'post',
  route: '/shop',
  controller: ShopController,
  action: 'create'
}, {
  method: 'get',
  route: '/shop/all',
  controller: ShopController,
  action: 'all'
}, {
  method: 'get',
  route: '/shop/:id',
  controller: ShopController,
  action: 'one'
}]
