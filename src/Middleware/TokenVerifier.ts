import AuthController from '../controller/Authcontroller'
import {  Request } from 'express'

 export default class TokenVerifier {
  
  private static instance:TokenVerifier = new(TokenVerifier); //Singleton

  private constructor() { } // O construtor no singleton deve ser privado para evitar a criação de outro objeto

  public static getInstance(): TokenVerifier {
    if (!TokenVerifier.instance) {
        TokenVerifier.instance = new TokenVerifier();
    }

    return TokenVerifier.instance;
  } 

  private verifyToken(request: Request) {
    const jwt = request.headers.authorization
    if (jwt) {
      let auth = new AuthController();
      const canUseRoute = auth.checkJwt(jwt);
      if (canUseRoute) return true;
    }
    return false
  }

  private tokenMiddleware (response: Response, hasToken: boolean, dbResponse) {
    return hasToken ? dbResponse : response.status(401).send('Authorization failed')
  }
}