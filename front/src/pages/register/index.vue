<template>
  <!--一些标签不能使用,v-html不能用,不能使用href之类的跳转,不能用router-view,最外层必须用一个div元素包起来-->
  <div id="reg-all">
<!--    <div class="ph-nav"><i class="iconfont" @click="backTo()">&#xe606;</i></div>-->
    <p class="ph-nav" v-if="show_headBar==true"><i class="iconfont" @click="page_back()">&#xe606;</i></p>
    <p class="til">注册</p>
    <p class="p1">新用户注册，立即获得2个积分</p>
    <div id="info">
      <div class="inp_out">
        <input class="inp" v-model="d.phone" placeholder="手机号"/>
        <img class="img" mode="widthFix" src="../../../static/img/ic_login_phone.png"/>
      </div>
      <div class="inp_out">
        <input placeholder="验证码" v-model="d.verify" class="inp"/>
        <img class="img" mode="widthFix" src="../../../static/img/verify_icon.png"/>
        <p class="get_verify" @click="getVerify()">{{ d.vecon }}</p>
      </div>
      <div class="inp_out">
        <input placeholder="6-20位登录密码" type="password" v-model="d.password" class="inp"/>
        <img class="img" mode="widthFix" src="../../../static/img/ic_login_Password.png"/>
      </div>
      <div class="inp_out">
        <input placeholder="再次确定密码" type="password" v-model="d.surePass" class="inp"/>
        <img class="img" mode="widthFix" src="../../../static/img/ic_login_Password.png"/>
      </div>
    </div>
    <p id="submit" @click="rgs()">注册</p>
    <p id="deal" @click="to_page('../pages/agreement/main')">注册即同意相关协议<b class="b">《赶马商城会员注册协议》</b></p>
    <!--提示-->
    <div id="small-hint" v-bind:style="{ display:d.hint.s.dpy,opacity:d.hint.s.opc }">
      <em class="em1"><i class="iconfont">&#xe74e;</i></em>
      <em class="em">{{ d.hint.s.con }}</em>
    </div>
  </div>
</template>
  <script>
  var d = {
    phone:'',
    password:'',
    surePass:'',
    verify:'',
    i:59,
    can_get:true,
    vecon:'获取验证码',
    hint:{
      back:'none',
      s:{dpy:'none',opc:'0',con:'提示内容'}
    }
  };
  var play;
  // 页面跳转
  function reLaunchPageTo (url_) {
    // 页面重加载,因为每个页面都是在一个单独文件夹下所以不能使用页面切换方法
    wx.reLaunch({url:'/'+url_});
  }
  // 反回上一页
  function backPage() {
    try{
      var pag = getCurrentPages();
      var before = pag[0].__displayReporter.showReferpagepath.split(".")[0];
      wx.reLaunch({url:'/'+before});
    }
    catch (e) {
      window.history.back();
    }
  }
  // 读秒
  function verify_con(){
    d.vecon -= 1;
  }
  export default {
  data () {
    // 选项 数据,return当中写数据
    return {
      d
    }
  },
  components: {
    // 定义组件

  },
  methods: {
    // 事件处理方法
    getVerify(){
      //获取验证码
      if(d.can_get===false){
        return;
      }
      if(!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(d.phone))){
        this.small_hint('手机号格式错误');
        return;
      }
      this.request({
        method: 'post',
        url:this.$url['loginAndup']['getVerifiURL'],
        data:{
          'phone':d.phone,
          'type':1
        },
        dataType:'json',
        success:function(res){
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if(res_.status==1){
            d.can_get = false;
            d.vecon = 60;
            play = setInterval(verify_con,1000);
            setTimeout(function(){
              clearInterval(play);
              d.vecon = '获取验证码';
              d.can_get = true;
            },60000);
          }
          else{
            d.can_get = true;
            d.hint.s.con = res_.msg;
            d.hint.s.dpy = "block";
            d.hint.s.opc = "1";
            setTimeout(function(){
              d.hint.s.opc = "0";
            },1000);
            setTimeout(function(){
              d.hint.s.dpy = "block";
            },1300);
          }
        }
      });
    },
    backTo(){
      this.backPage();
    },
    rgs(){
      // 点击注册
      var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if(!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(d.phone))){
        this.small_hint('手机号格式错误');
        return;
      }
      else if(!d.verify){
        this.small_hint('请填写验证码');
        return;
      }
      else if(!d.password){
        this.small_hint('密码不能为空');
        return;
      }
      else if(/[@#\$%\^&\*]+/g.test(d.password) || reg.test(d.password)){
        this.small_hint('密码中不能含特殊字符和中文');
        return;
      }
      else if(d.password.length<6){
        this.small_hint('密码长度不小于6位');
        return;
      }
      else if(d.password.length>20){
        this.small_hint('密码长度不能大于20');
        return;
      }
      else if(d.password!=d.surePass){
        this.small_hint('前后密码不一样');
        return;
      }
      this.request({
        method:'post',
        url:this.$url['loginAndup']['logUPURL'],
        data:{
          'phone':d.phone,
          'password':d.password,
          'invitecode':null,
          'code':d.verify,
          'mac_no':null,
          'openid':null
        },
        dataType:'json',
        success:function(res){
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if(res_.status==1){
            d.hint.s.con = res_.msg;
            d.hint.s.dpy = "block";
            d.hint.s.opc = "1";
            setTimeout(function(){
              d.hint.s.opc = "0";
              reLaunchPageTo('pages/login/main');
            },1000);
            setTimeout(function(){
              d.hint.s.dpy = "block";
            },1300);
          }
          else{
            d.hint.s.con = res_.msg;
            d.hint.s.dpy = "block";
            d.hint.s.opc = "1";
            setTimeout(function(){
              d.hint.s.opc = "0";
            },1000);
            setTimeout(function(){
              d.hint.s.dpy = "block";
            },1300);
          }
        }
      });
    },
    small_hint:function(info){
      d.hint.s.con = info;
      d.hint.s.dpy = "block";
      d.hint.s.opc = "1";
      setTimeout(function(){
        d.hint.s.opc = "0";
      },1000);
      setTimeout(function(){
        d.hint.s.dpy = "block";
      },1300);
    }
  },
  created () {
    // 生命周期函数
    // console.log('homeroot', this.$root, this.$root.$mp)
  },
  mounted () {
      // console.log('home999', this.$root, this.$root.$mp)
  }
}
</script>
<!--需要使用less语言来写css-->
<style lang="less">
  @bg_color:#efefef;
  @f_back:#5d5d5d;
  @f_gray:#6e6e6e;
  @f_green:#0fca9d;
  @f_red:#fa6969;
  @f_dgray:#cdcdcd;
  @size:18.75rem;
  #reg-all{
    position: relative;
    width: 100%;
    >.ph-nav{
      position: relative;
      height: 2.3rem;
      >.iconfont{
        position: absolute;
        display: block;
        font-size: 16px;
        left: 5.3%;
        top: 0.68rem;
      }
    }
    >.til{
      position: relative;
      font-size: 20px;
      font-weight: 600;
      padding-left: 5.3%;
      margin-top:1.05rem;
    }
    >.p1{
      position: relative;
      font-size: 14px;
      padding: 0.3rem 5.3%;
    }
    #info{
      position: relative;
      width: 89.3%;
      margin: 2.15rem auto;
      >.inp_out{
        position: relative;
        width: 100%;
        margin-bottom: 1.05rem;
        >.inp{
          width: 100%;
          position: relative;
          height: 1.78rem;
          line-height: 1.78rem;
          font-size: 14px;
          padding-left: 1.36rem;
          outline: none;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid darkgray;
        }
        >.img{
          position: absolute;
          z-index: 120;
          width: 0.47rem;
          left: 0;
          top: 0.52rem;
        }
      }
    }
    .get_verify{
      position: absolute;
      font-size: 12px;
      width: 80/@size;
      text-align: center;
      color: white;
      background: #70d9ba;
      padding: 0.36rem 0;
      bottom: 0.26rem;
      right: 0;
      z-index: 500;
      border-radius: 15px;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      -ms-border-radius: 15px;
    }
    #submit{
      position: relative;
      width: 89.3%;
      height: 2.1rem;
      line-height: 2.1rem;
      text-align: center;
      font-size: 16px;
      margin: 0 auto;
      color: white;
      border-radius: 25px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      -ms-border-radius: 25px;
      background: linear-gradient(left,#65efce,#15cca0);
      background: -webkit-linear-gradient(left,#65efce,#15cca0);
      background: -o-linear-gradient(left,#65efce,#15cca0);
      background: -moz-linear-gradient(left,#65efce,#15cca0);
      background: -ms-linear-gradient(left,#65efce,#15cca0);
    }
  }
  #deal{
    position: fixed;
    width: 100%;
    text-align: center;
    left: 0;
    bottom: 0;
    padding: 10/@size;
    font-size: 14px;
    >.b{
      display: inline;
      font-size: 14px;
      color: @f_green;
      margin-left: 2px;
    }
  }
</style>
