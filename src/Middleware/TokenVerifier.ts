import AuthController from '../controller/Authcontroller'
import {  Request } from 'express'

 export default class TokenVerifier {
  verifyToken(request: Request) {
    const jwt = request.headers.authorization
    if (jwt) {
      let auth = new AuthController();
      const canUseRoute = auth.checkJwt(jwt);
      if (canUseRoute) return true;
    }
    return false
  }

  tokenMiddleware (response: Response, hasToken: boolean, dbResponse) {
    return hasToken ? dbResponse : response.status(401).send('Authorization failed')
  }
}