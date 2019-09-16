// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './AppH5'
import router from './router'
import wxService from './api/wxService'
import httpService from './api/httpService'
import store from './store'
import Fly from './utils/ajax'
import urls from './utils/url_'
import objItem from './utils/webAndAI'

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

//浏览器判断
var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      //移动终端浏览器版本信息//IE内核
      trident: u.indexOf('Trident') > -1,
      //opera内核
      presto: u.indexOf('Presto') > -1,
      //苹果、谷歌内核
      webKit: u.indexOf('AppleWebKit') > -1,
      //火狐内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      //是否为移动终端
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      //ios终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      //android终端或uc浏览器
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      //是否为iPhone或者QQHD浏览器
      iPhone: u.indexOf('iPhone') > -1,
      //是否iPad
      iPad: u.indexOf('iPad') > -1,
      //是否web应该程序，没有头部与底部
      webApp: u.indexOf('Safari') == -1
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
var ua = navigator.userAgent.toLowerCase();

Vue.use(Vuex);
Vue.mixin({
  data () {
    return {
      webList:objItem.webs,
      AIList:objItem.AIs,
      image:urls['img'],
      //窗口尺寸,设备尺寸
      ww:0,
      wh:0,
      sw:0,
      sh:0,
      //用户标识
      user_toke:'',
      user_id:'',
      bt_canvas:{
        w:350,
        h:45
      },
      router:'/',
      nav_index:0,
      env:'pc'
    }
  },
  methods: {
      to_page(url_){
        //不关闭当前页的跳转/
        this.$router.push('../'+url_);
      },
      navTo(url,idx){
        //路由跳转使用(关闭当前页的跳转)
        this.nav_index = idx;
        this.$router.replace(this.router+url);
      },
      setLStorage(name,data,sel){
        // 设置本地存储,sel为0是session,为1是local
        var i = sel || 0;
        if(i===0){sessionStorage.setItem(name,data);}
        else{localStorage.setItem(name,data);}
      },
      clearStorage(name){
        //清除所有缓存
          localStorage.clear(name);
          sessionStorage.clear(name);
      },
      getStorage(name,sel){
        // 获取存储
        var i = sel || 0;
        if(i===0){return sessionStorage.getItem(name);}
        else{return localStorage.getItem(name);}
      },
      page_back(){
      //返回上一页
         window.history.back();
      },
      get_token(){
        // get user token
        var res = this.getStorage('token',0) || this.getStorage('token',1) || null;
        if(res){
          return res;
        }
        else{
          res = this.get_url_argments('token') || null;
          return res;
        }
      },
    refreshPage(){
      // 刷新页面
      window.location.reload([true]);
    },
      get_url_argments(name){
        //获取地址栏参数
        var argumentValueArr = null,
          str,s;
        var url_ = window.location.href;
        // 参数与接口用?隔开
        if(url_.indexOf("?")==-1){
          // 无任何参数情况
          return null;
        }
        //确保是选中最后一个
        s = url_.split("?");
        str = s[s.length-1];
       // str = url.indexOf('#')!=-1 ? str.split('#')[0] : str;
        if(str.indexOf("&") != -1) {
          // 多个参数的情况,多个参数间用一个&符号隔开,按输入参数顺序返回一个数组
          str = str.split("&");

            for(var j = 0; j < str.length; j++) {
              if(str[j].split("=")[0] == name) {
                argumentValueArr = str[j].split("=")[1];
              } else {
                continue;
              }
            }
          // 返回值中若有数字则是字符串型的
        } else {
          if(name==str.split("=")[0]){
            // 只有一个值时也要判断是否相等
            argumentValueArr = str.split("=")[1];
          }
        }
        return argumentValueArr;
      },
      set_title(title_){
      // 修改标题
          window.document.title = title_;
      },
    scroll_load(e){
       //滚动加载使用,出入元素对象,传入fn参数页数，运行的函数,s_top+e_h = s_h
      var e_h = e.currentTarget.offsetHeight;
      var s_h = e.currentTarget.scrollHeight;
      var s_top = e.currentTarget.scrollTop;
      var self = this;
      //防止用户滑动到底部后多次触发加载函数
      if(el_can_scroll===true){
        //距离底部20px时就触发
        //el_can_scroll = false;
        if((s_h-s_top)<e_h+20){
          return true;
        }
        //2s后再置为true
      }
      else{return false;}
      },
      request:Fly,
    dra_bt_nav(){
        //draw nav of bottom in canvas
        var can = document.getElementById('ph-bt-canvas');
        var ctx = can.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.moveTo(0,this.bt_canvas.h);
        ctx.quadraticCurveTo(this.bt_canvas.w*0.03,0,this.bt_canvas.w*0.1,0);
        ctx.lineTo(this.bt_canvas.w*0.9,0);
        ctx.quadraticCurveTo(this.bt_canvas.w*0.97,0,this.bt_canvas.w,this.bt_canvas.h);
        ctx.closePath();
        ctx.fill();
    },
    alter_size(number){
        //按照比例转化尺寸大小，pc,ph
      if(this.env==='pc'){return number;}
      else{
        return (this.ww*number)/375;
      }
    }
  },
  created () {
      this.service = httpService;
      //获取屏幕尺寸，环境
      this.ww = window.innerWidth;
      this.wh = window.innerHeight;
      this.sw = window.screen.width;
      this.sh = window.screen.height;
      this.bt_canvas.w = this.ww;
      this.env = this.ww>768 ? 'pc' : 'ph';
      //DOM元素加载完成后进入绘制事件
      document.addEventListener('DOMContentLoaded',()=>{
        this.dra_bt_nav();
      });
      //判断是否在微信打开
      if(ua.match(/MicroMessenger/i) == "micromessenger"){
        this.in_wx = true;
      }
  }
});
Vue.prototype.$url = urls['urls'];

/* eslint-disable no-new */
var wcs_web = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});

//将url,ajax绑定到原型上
//Vue.prototype.methods.request = Fly;



