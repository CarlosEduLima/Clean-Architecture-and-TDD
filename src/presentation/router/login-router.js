const HttpResponse = require('../helpers/http-response')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badResquest('email')
      }
      if (!password) {
        return HttpResponse.badResquest('password')
      }
      const accessToken = this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.success({ accessToken: accessToken })
    } catch (error) {
      // console.error(error)
      return HttpResponse.ServerError()
    }
  }
}
