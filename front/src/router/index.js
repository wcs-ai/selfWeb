import Vue from 'vue'
import Router from 'vue-router'

import AI from '../pages/AI/index.vue'
import home from '../pages/home/index.vue'
import heart from '../pages/heart/index.vue'
import collects from '../pages/collects/index'
import etcTime from '../pages/extractTime/index'
import web from '../pages/web/index'

/*H5使用的路由，与小程序无关*/
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    alias: '/pages/home/main',
    meta:{title:'首页'}
  }, {
    path: '/AI',
    name: 'AI',
    component: AI,
    alias: '/pages/AI/main',
    meta:{title:'人工智能'}
  }, {
      path: '/heart',
      name: 'heart',
      component: heart,
      alias: '/pages/heart/main',
      meta:{title:'心灵世界'}
  },{
    path: '/collects',
    name: 'collects',
    component: collects,
    alias: '/pages/collects/main',
    meta:{title:'收藏'}
  },{
    path: '/etcTime',
    name: 'etcTime',
    component: etcTime,
    alias: '/pages/etcTime/main',
    meta:{title:'时间提取'}
  },{
    path: '/web',
    name: 'web',
    component: web,
    alias: '/pages/web/main',
    meta:{title:'前端'}
  }]
});
