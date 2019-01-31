import router from '@/router'

const state = {
  user: null,
  error: null,
  loading: false,
  emailUnique: true
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setEmailUnique (state, payload){
    state.emailUnique = payload
  }
}

const getters = {
  isAuthenticated (state) {
    return state.user !== null && state.user !== undefined
  }
}

const actions = {
  userSignUp ({commit}, payload) {
    for (let user of payload.users.usersList) {
      if (payload.email === user.email) {
        router.push('/signup')
        commit('setEmailUnique', false)
        return false
      }
    }
    commit('setUser', {email: payload.email, password: payload.password})
    commit('setEmailUnique', true)
    commit('setLoading', true)
    return true
    // rootState.// verify from /users/
    // rootState.// verify from /users/
    // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    // .then(firebaseUser => {
    //   commit('setUser', {email: firebaseUser.user.email})
    //   commit('setLoading', false)
    //   router.push('/home')
    // })
    // .catch(error => {
    //   commit('setError', error.message)
    //   commit('setLoading', false)
    // })
  },
  userSignIn ({commit}, payload) {
    // commit('setLoading', true)
    commit('setUser', { email: payload.email})
    router.push('/home')
    // firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    // .then(firebaseUser => {
    //   commit('setUser', {email: firebaseUser.user.email})
    //   commit('setLoading', false)
    //   commit('setError', null)
    //   router.push('/home')
    // })
    // .catch(error => {
    //   commit('setError', error.message)
    //   commit('setLoading', false)
    // })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', { email: payload.email })
  },
  userSignOut ({commit}) {
    // firebase.auth().signOut()
    commit('setUser', null)
    router.push('/')
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
