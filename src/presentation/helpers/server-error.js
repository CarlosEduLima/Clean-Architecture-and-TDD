module.exports = class MissingParamError extends Error {
  constructor () {
    super('Internal Server Error')
    this.name = 'Server Error'
  }
}
