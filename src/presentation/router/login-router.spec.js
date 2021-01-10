const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class AuthCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}
describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 500 if no httpRequest body is provided', () => {
    const { sut } = makeSut()
    const httResquest = {}
    const httpResponse = sut.route(httResquest)
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })
})
