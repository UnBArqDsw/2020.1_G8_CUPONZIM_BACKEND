import { ClientController } from './controller/ClientController'

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
  action: 'save'
}, {
  method: 'delete',
  route: '/users/:id',
  controller: ClientController,
  action: 'remove'
}]
