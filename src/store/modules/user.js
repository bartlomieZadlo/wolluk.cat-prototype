import uniqid from 'uniqid'

export class User {
  constructor (payload) {
    this.email = payload.email
    this.password = payload.password
    this.id = generateId()
    this.roles = {}
  }
}

function generateId () {
  return uniqid()
}
