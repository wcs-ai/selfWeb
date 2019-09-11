import Vue from 'vue'
import Router from 'vue-router'

import AI from '../pages/AI/index.vue'
import home from '../pages/home/index.vue'

import heart from '../pages/heart/index.vue'
import collects from '../pages/collects/index'
import regis from '../pages/register/index'
import pdetail from '../pages/pDetail/index'
import front from '../pages/front/index'
import submitForm from '../pages/submitForm/index'
import web from '../pages/web/index'
import app_share from '../pages/AppShare/index'

/*H5使用的路由，与小程序无关*/
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    alias: '/pages/home/main',
    meta:{title:'wcs'}
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
    path: '/register',
    name: 'register',
    component: regis,
    alias: '/pages/register/main',
    meta:{title:'注册'}
  },{
    path: '/pedtail',
    name: 'pedtail',
    component: pdetail,
    alias: '/pages/pDetail/main',
    meta:{title:'商品详情'}
  },{
    path: '/front',
    name: 'front',
    component: front,
    alias: '/pages/front/main',
    meta:{title:'前端'}
  },{
    path: '/web',
    name: 'web',
    component: web,
    alias: '/pages/web/main',
    meta:{title:'前端'}
  }]
});
