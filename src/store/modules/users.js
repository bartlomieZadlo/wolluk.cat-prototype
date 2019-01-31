import {User} from './user'
import router from '@/router'

const state = {
  usersList: []
}
const getters = {

}
const actions = {
  addUserToStorage ({commit}, payload) {
    if (payload.emailUnique){
      let user = new User(payload)
      commit('addUser', user)
      router.push('/home')
    }
  }
}
const mutations = {
  addUser (state, user) {
    state.usersList.push(user)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
