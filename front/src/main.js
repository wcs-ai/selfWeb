import Vue from 'vue'
import App from './App'
import store from './store'
import wxService from './api/wxService'
import urls from './utils/url_'
import httpService from './api/httpService'



/*
this.request({
  method:'post',
  url:this.$url['self']['selfInfoURL'],
  data:{
    'token':d.token
  },
  dataType:'json',
  success:function(res){
    var res_;
    if(res.statusCode){res_ = res.data;}
    else{res_ = res;}
    if(res_.status==1){

    }
    else{

    }
  }
});
*/
Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;
//Vue.prototype.$parse = wxParse;
var md = {
  show_web_view:false,
  view_src:'',
  hint:{
    back:'none',
    s:{dpy:'none',opc:'0',con:'提示内容'},
    c:{dpy:'none',opc:'0.4',con:''}
  }
};
Vue.mixin({
  data() {
    return {
      md:md,
      key_:'',
      is_web:false,
      openApp_protocol:'',
      image:urls['img'],
      //消息通知数量、购物车数量
      info_num:0,
      cart_num:0,
      //窗口尺寸
      ww:0,
      wh:0,
      //用户标识
      user_toke:'',
      user_id:'',
      //配合scroll-view标签使用的子元素内嵌样式
      sty:{
        'product':'',
        'rowL':'',
        'rowR':'',
        'img':'',
        'p1':'',
        'p2':'',
        'b':'',
        'em':'',
        'p3':''
      },
      share:{
        url_:'',
        qq:'',
        qqSpace:'',
        xl:'',
        repeat_link:'',
        col:'#5d5d5d',
        word:'复制链接'
      },
      session_key:'',
      openid:'',
      get isNotWx(){
        let boo;
        try{
          wx;
          boo=false;
        }catch(e){
          boo=true;
        }
        return boo;
      },
      // 所有地址
      service: '../build/dev-server',
      router: '/',
      imgSrc: '/',
      //项目通用的一些页面样式属性。
      common_property:{
        f_color:'',
        bg_color:'white',
        f_size:''
      },
    }
  },
  methods: {
    //配置一些常用的方法，如：路由跳转、本地存储
      newroot () {
        //路径
          return this.$root.$mp;
      },
      to_page(url_){
        // 不关闭当前页面的跳转
        wx.navigateTo({url:'../'+url_});
      },
      reLaunchPageTo (url_) {
        // 页面重加载,因为每个页面都是在一个单独文件夹下所以不能使用页面切换方法
        wx.redirectTo({url:this.router+url_});
      },
      page_back(){
        var pag = getCurrentPages();
        var before_page = pag[pag.length-2];
        wx.navigateBack({
          success:function(){
            before_page.onLoad();
          }
        });
      },
      backPage(){
      //返回上一页
      //__displayReporter.showReferpagepath
        var pag = getCurrentPages();
        var before = pag[0].__displayReporter.showReferpagepath.split('.')[0];
        this.reLaunchPageTo(before);
      },
      setStorage(name,data){
        // 设置本地存储
        wx.setStorageSync(name,data);
      },
      clearStorage(name){
        wx.clearStorage();
      },
      getStorage(name){
        // 获取存储
        return wx.getStorageSync(name);
      },
      onShareAppMessage(){
        //wx share
        return{
          title:'分享',
          desc:'内容',
          path:''
        }
      },
      wx_copy(info){
        //wx js copy
        wx.setClipboardData({
          data:info,
          success:function(){}
        });
      },
      refreshPage(){
        // 刷新页面
          wx.reload();
      },
      get_url_argments(name){
        // 获取路由中的参数,参数名称,获取页面栈当前页为最后一页
        var url_ = getCurrentPages();
        var res = null,succ = false;
        var args;
        if(url_.length===0){
          res = null;
        }
        else{
          args = url_[url_.length-1].__displayReporter.query;
          for(var i in args){
            if(name===i){
              res = args[i];
              succ = true;
            }
          }
        }
        if(succ===false){
          res = this.getStorageSync('here_pid') || null;
        }
        return res;
      },
      get_token(){
        //遍历存储和地址栏获取token
        var res = null;
        var res1 = this.get_url_argments('token');
        var res2 = this.getStorageSync('token');

        if(res2){
          res = res2;
        }
        else if(res1){
          res = res1;
        }
        else{
          res = null;
        }
        return res;
      },
      set_title(title_){
        // 修改标题
        wx.setNavigationBarTitle({title:title_});
      },
      to_pay(info){
        //支付调用
        wx.requestPayment({
          'timeStamp':info['timeStamp'],
          'nonceStr':info['nonceStr'],
          'paySign':info['paySign'],
          'signType':info['signType'],
          'package':info['package'],
          success:function(res){
            console.log('成功',res);
          },
          fail:function(res){
            console.log('失败',res);
          }
        });
      },
      take_phone(){
        //make phone server
        wx.makePhoneCall({
          phoneNumber:'0871-68576958'
        });
      },
      request(info){
        //网络请求
        var info_;
        if(info.header){
          info_ = info;
        }
        else{
          info['header'] = {'content-type': 'application/x-www-form-urlencoded'};
          info_ = info;
        }
        wx.request(info_);
      },
    skip_page(info,str){
      //根据info分割管道符跳转到对应页面,str为其附加的参数拼接成：&sid=1&token=0  ...
      var message = info.split('|');
      var s = str || '';
      var token = this.get_token();
      switch (message[0]) {
        case 'goods':
          //跳商品详情
          this.to_page('../pages/pDetail/main?token='+token+'&pid='+message[1]+s);
          break;
        case 'goodslist':
          //跳商品列表
          this.to_page('../pages/thirdClass/main?token='+token+'&cid='+message[1]+s);
          break;
        case 'h5':
          //跳到页面
          if(message[1].indexOf('https')===-1){
            //不是https开头
            message[1] = message[1].replace(/http/,'https');
          }
          md.view_src = message[1]+'?token='+token+'&show_title=false';
          md.show_web_view = true;
         this.to_page('../pages/webView/main?token='+token);
          break;
        case 'brand':
          //跳到品牌
          this.to_page('../pages/brand/main?token='+token+'&bid='+message[1]+s);
          break;
        case 'store':
          //跳到店铺
          this.to_page('../pages/zzjTaShop/main?token='+token+'&sid='+message[1]+s);
          break;
        case 'article':
          //跳到文章详情
          this.to_page('../pages/atcDetail/main?token='+token+'&aid='+message[1]+s);
          break;
        case 'articlelist':
          //跳到文章列表
          this.to_page('../pages/aa/main?token='+token+'&aid='+message[1]+s);
          break;
        case 'ranklist':
          //跳到排行榜
          this.to_page('../pages/rankList/main?token='+token+'&rid='+message[1]+s);
          break;
        case 'ganmalist':
          //跳到赶马之宝
          this.to_page('../pages/gMBaby/main?token='+token+'&gid='+message[1]+s);
          break;
        case 'newgoods':
          //跳到新品上架
          this.to_page('../pages/newGoods/main?token='+token+'&nid='+message[1]+s);
          break;
        case 'promotion':
          //跳到包邮
          this.to_page('../pages/promopt/main?token='+token+'&type='+message[1]+s);
          break;
        case 'videolist':
          //跳到视频列表
          this.to_page('../pages/videoList/main?token='+token+'&vid='+message[1]+s);
          break;
        case 'integrallist':
          //跳到积分商城
          this.to_page('../pages/zzjSshop/main?token='+token+'&jid='+message[1]+s);
          break;
        case 'couponlist':
          //跳到优惠券列表
          this.to_page('../pages/zzjQuanCenter/main?token='+token+'&qid='+message[1]+s);
          break;
        case 'orderlist':
          //订单列表
          if(token){
            this.to_page('../pages/goodsForm/main?token='+token+'&sta='+message[1]+s);
          }
          else{
            this.to_page('../pages/login/main')
          }
           break;
        case 'applystore':
          //到申请店铺
          this.to_page('../pages/applyStore/main?token='+token+s);
          break;
        case 'mystore':
          this.to_page('../pages/zzjTaShopList/main?token='+token+'&is_his=true&sid='+message[1]+s);
          break;
        case 'unionbuylist':
          this.to_page('../pages/knock/main?token='+token+'&kid='+message[1]+s);
          break;
        case 'promotionlist':
          this.to_page('../pages/monthlySpecial/main?token='+token+'&pro='+message[1]+s);
          break;
      }
    },
    take_share(url_){
      //处理分享链接
      this.share.qq = 'http://connect.qq.com/widget/shareqq/index.html?title=页面分享&url='+url_;
      this.share.qqSpace = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url_+"&title=页面分享";
      this.share.xl = 'http://v.t.sina.com.cn/share/share.php?url='+url_;
    },
    get_info_num(){
        //获取 消息通知数量
      var token = this.get_token();
      var self = this;
      this.request({
        method:'post',
        url:this.$url['index']['infoNumURL'],
        data:{
          'token':token
        },
        dataType:'json',
        success:function(res){
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if(res_.status==1){
            self.info_num = res_.data['count'];
          }
          else{

          }
        }
      });
    },
    get_cart_num(){
        //获取购物车数量
      var token = this.get_token();
      var self = this;
      this.request({
        method:'post',
        url:this.$url['index']['cartNumURL'],
        data:{
          'token':token
        },
        dataType:'json',
        success:function(res){
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if(res_.status==1){
            self.cart_num = res_.data['total_num'];
          }
          else{

          }
        }
      });
    },
    check_title_show(){},
    small_hint(info){
      wx.showToast({
        title:info,
        icon:'none',
        duration:2000
      });
    }
  },
  created() {
      this.service = wxService;
      this.ww = wx.getSystemInfoSync().windowWidth;
      this.wh = wx.getSystemInfoSync().windowHeight;
      //this.normalEl();
  }
});

const app = new Vue(App);
app.$mount();

zzj_tool.setup();
Vue.prototype.$url = urls['urls'];


// 输出对象
export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    // 这里添加多页面？
    pages: ['^pages/home/main','pages/cart/main','pages/class/main','pages/self/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '赶马商城',
      navigationBarTextStyle: 'black',
      //navigationStyle:'custom'
    },
    //tabBar是底部导航栏
  }
}
/*
"tabBar": {
  "color": "#5d5d5d", //tabbar选项文字的默认颜色
  "selectedColor": "#0fca9d", //tabbar选项选中文字的颜色
  "backgroundColor": "white",  //tabbar的背景颜色
  "borderStyle": "white",   //tabbar上边框的颜色   仅支持 black / white     默认是black
  "position": "bottom",   //tabbar的位置   仅支持 bottom / top            默认是bottom
  "list": [   //list是tab 的列表，  list数组里面要最少2个、最多5个对象。
    {
      "pagePath": "pages/home/main",//跳转页面的路径
      "text": "首页",                 //tabbar选项的文字
      "iconPath": "static/img/wx_bt_nav11.png", //tabbar选项的图片
      "selectedIconPath": "static/img/wx_bt_nav12.png" //tabbar选项选中的图片
    },
    {
      "pagePath": "pages/class/main",
      "text": "分类",
      "iconPath": "static/img/wx_bt_nav21.png",
      "selectedIconPath": "static/img/wx_bt_nav22.png"
    },
    {
      "pagePath": "pages/cart/main",
      "text": "购物车",
      "iconPath": "static/img/wx_bt_nav31.png",
      "selectedIconPath": "static/img/wx_bt_nav32.png"
    },
    {
      "pagePath": "pages/self/main",
      "text": "我的",
      "iconPath": "static/img/wx_bt_nav41.png",
      "selectedIconPath": "static/img/wx_bt_nav42.png"
    }
  ]
}
*/
