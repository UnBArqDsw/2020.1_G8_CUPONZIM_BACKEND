# Endpoints

## Client
### /client 
#### POST:
* Body:
* * name
* * username
* * password
* * avatarImg
* * cellphone
* Response:
* * 200: Usuário criado com sucesso
* * 500: Erro interno
* * 501: Erro no request

#### GET
* Header
* * Authorization: Bearer jwt(client)
* Response
* * 200 (username,name,avatarImg,cellphone,favoriteShops): Retorna informações do usuário logado atualmente
* * 401: JWT não informado ou não válido
* * 500: Erro interno


#### PUT
* Header
* * Authorization: Bearer jwt(client,admin)
* Body
* * name
* * avatarImg
* * cellphone
* Response
* * 200 : Modifica o usuário logado atualmente
* * 401: JWT não informado ou não válido
* * 500: Erro interno

#### DELETE
* Header
* * Authorization: Bearer jwt (admin)
* Response
* * 200 : Deleta o usuário logado atualmente
* * 401: JWT não informado ou não válido
* * 500: Erro interno

### /client/favorite

#### POST
* Params
* * shopId
* Header
* * Authorization: Bearer jwt (client)
* Response
* * 200 : Desfavorita a loja com o usuário atual
* * 401: JWT não informado ou não válido
* * 500: Erro interno

#### DELETE
* Params
* * shopId
* Header
* * Authorization: Bearer jwt (client)
* Response
* * 200 : Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno

## Shop
### /location

#### POST:
* Header
* * Authorization: Bearer JWT (Admin)
* Body:
* * name
* * lat
* * long
* * type
* Response
* * 200: Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno

#### GET:
* Header
* * Authorization: Barer JWT (Admin, client, shop)
* Response
* * 200(name,lat,long,type): Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno

#### PUT:
* Header
* * Authorization: Bearer JWT (Admin)
* Body:
* * name
* * lat
* * long
* * type
* Response
* * 200: Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno

### /shop
#### POST:
* Body
* * name
* * description
* * username
* * password
* * id_location
* * image_shop
* Response
* * 200: Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno

#### GET:
* Params
* * idShop (opcional)
* * idLocation
*  Header
* * Authorization: Bearer JWT (Admin, client)
* Response
* * 200: Retorna todas as lojas cadastradas na localização ou somente uma se for enviado idShop nos parâmetros
* * 401: JWT não informado ou não válido
* * 500: Erro interno 
#### PUT:
* Header
* * Authorization: Bearer JWT (shop)
* Body
* * name
* * description
* * id_location
* * image_shop
* Response
* * 200: Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno

## Coupon
### /lot
#### POST:
* Header
* * Authorization: Bearer JWT (shop)
* Body
* * name_lot_coupon
* * description_lot_coupon
* * original_price
* * discount_price
* * expiration_date
* * numberCoupons
* Response
* * 200: Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno
#### GET:
* Params:
* * location_id (opcional)
* * shop_id (opcional)
* Header
* * Authorization: Bearer JWT (client, shop, admin)
* Response
* * 200: Retorna todos os lotes válidos se nenhuma localidade ou loja forem informados, se forem retorna todos os lotes válidos pertencentes a essa localização ou loja
* * 401: JWT não informado ou não válido
* * 500: Erro interno
* 
#### PUT:
* Params:
* * lot_id
* Header
* * Authorization: Bearer JWT (shop)
* Body
* * name_lot_coupon
* * description_lot_coupon
* * original_price
* * discount_price
* * expiration_date
* Response
* * 200: Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno

#### DELETE:
* Params:
* * lot_id
* Header
* * Authorization: Bearer JWT (shop)
* Response
* * 200: Requisição feita com sucesso, lote apagado
* * 401: JWT não informado ou não válido
* * 500: Erro interno

### /coupon
#### PUT
* Params
* * coupon_id
* Body
* * is_used
* Response
* * 200: Requisição feita com sucesso
* * 401: JWT não informado ou não válido
* * 500: Erro interno