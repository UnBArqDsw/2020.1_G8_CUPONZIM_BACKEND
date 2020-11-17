import { ClientController } from './controller/ClientController'
import { LocationController} from './controller/LocationController'

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
  action: 'remove' ///
},{
  method: 'get',
  route: '/location',
  controller: LocationController,
  action: 'all'
},
{
  method: 'get',
  route: '/get/:id',
  controller: LocationController,
  action: 'one'
}, {
  method: 'post',
  route: '/users',
  controller: LocationController,
  action: 'create'
}, {
  method: 'delete',
  route: '/users/:id',
  controller: LocationController,
  action: 'remove'
}
]
