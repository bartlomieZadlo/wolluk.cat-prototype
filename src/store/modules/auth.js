import router from '@/router'

const state = {
  user: null,
  error: null,
  loading: false
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
  }
}

const getters = {
  isAuthenticated (state) {
    return state.user !== null && state.user !== undefined
  }
}

const actions = {
  userSignUp ({commit, rootGetters, dispatch}, payload) {
    commit('setLoading', true)
    let usersList = rootGetters['users/getUsers']
    for (let user of usersList) {
      if (payload.email === user.email) {
        router.push('/signup')
        commit('setError', 'Email already exists in records')
        return
      }
    }
    commit('setUser', {email: payload.email, password: payload.password})
    commit('setLoading', false)
    dispatch('users/addUserToStorage', payload, {root: true})
    router.push('/home')
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
  userSignIn ({commit, rootGetters}, payload) {
    commit('setLoading', true)
    console.log(rootGetters['users/getUsers'])
    let userList = rootGetters['users/getUsers']
    for (let user of userList) {
      if (payload.email === user.email && payload.password === user.password) {
        commit('setUser', {email: payload.email})
        router.push('/home')
        return true
      }
    }
    commit('setLoading', false)
    commit('setError', 'Wrong Credentials')
    router.push('/signin')
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
