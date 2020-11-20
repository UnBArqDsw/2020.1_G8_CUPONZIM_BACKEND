import AuthController from '../controller/Authcontroller'
import { Request } from 'express'

export default class TokenVerifier {
  private static instance:TokenVerifier = new (TokenVerifier)(); // Singleton

  private constructor () { } // O construtor no singleton deve ser privado para
  // evitar a criação de outro objeto

  public static getInstance (): TokenVerifier {
    if (!TokenVerifier.instance) {
      TokenVerifier.instance = new TokenVerifier()
    }

    return TokenVerifier.instance
  }

  verifyToken (request: Request) {
    try {
      const jwt = request.headers.authorization
      if (jwt) {
        const auth = new AuthController()
        const jwtvalid = auth.checkJwt(jwt)

        return jwtvalid
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }

  tokenMiddleware (response: Response, hasToken: boolean, dbResponse) {
    return hasToken ? dbResponse : response.status(401).send('Authorization failed')
  }
}
