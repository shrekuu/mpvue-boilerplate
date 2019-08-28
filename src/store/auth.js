import storage from '../storage'

export default {
  namespaced: true,
  state: {
    api_token: storage.get(storage.api_token),
    user: storage.get(storage.user),
  },
  mutations: {
    setApiToken: (state, apiToken) => {
      state.api_token = apiToken
      storage.set(storage.api_token, apiToken)
    },
    setUser: (state, user) => {
      state.user = user
      storage.set(storage.user, user)
    },
  },
}
