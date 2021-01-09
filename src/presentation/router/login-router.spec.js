class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.ServerError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badResquest('email')
    }
    if (!password) {
      return HttpResponse.badResquest('password')
    }
  }
}
class HttpResponse {
  static badResquest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static ServerError () {
    return {
      statusCode: 500
    }
  }
}
class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing Param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const httResquest = {
      body: {
        password: 'password'
      }
    }
    const httpResponse = sut.route(httResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', () => {
    const sut = new LoginRouter()
    const httResquest = {
      body: {
        email: 'email'
      }
    }
    const httpResponse = sut.route(httResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 500 if no httpRequest is provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if no httpRequest body is provided', () => {
    const sut = new LoginRouter()
    const httResquest = {}
    const httpResponse = sut.route(httResquest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
