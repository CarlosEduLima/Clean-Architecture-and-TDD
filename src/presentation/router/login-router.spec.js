const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
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
