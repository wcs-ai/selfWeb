import Vue from 'vue'
import Vuex from 'vuex'

//测试模块
import moduleA from './modules/main'

//用户信息
import userInfoModule from './modules/userInfoModule'

//三级分类title
import navModules from './modules/navModules'

//登录信息
import loginInfoModule from './modules/loginInfoModule'



Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        a:moduleA,
        userInfoModule,
        navModules,
        loginInfoModule
    },
})
