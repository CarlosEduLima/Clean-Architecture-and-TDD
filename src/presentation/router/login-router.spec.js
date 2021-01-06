class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.body.email) {
      return {
        statusCode: 400
      }
    }
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
  })
})
