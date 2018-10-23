import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//导出vue实例
export default new Vuex.Store({
  state: {
    user: {
      state: false,
    },
    RecipeRecom: {},
    isShow: false,
    // isLoginHide: true,
  },
  //获取属性状态
  getters: {
    //获取登录状态
    state: state => state.user.state,
  },
  mutations: {
    //保存登录状态
    userStates(state, flag) {
      state.state.user.state = flag
    }
  },
  actions: {
    setUser({commit, flag}) {
      commit("userStatus", flag)
    }
  }


});
