export default {
  namespaced: true,
  state: {
    navVal: '1-1'
  },
  mutations: {
    changeNav(state,val){
      state.navVal = val
    }
  }
}
