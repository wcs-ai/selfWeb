<template>
  <div id="invite-all">
    <img class="img" v-bind:src="image.download_top" mode="widthFix"/>
    <div id="down-out">
      <a id="down-award" class="row" v-bind:href="d.dw_link">
        <img class="img" mode="widthFix" v-bind:src="image.download_android" v-if="d.is_android==true"/>
        <img class="img" mode="widthFix" v-bind:src="image.download_ios" v-else/>
      </a>
    </div>
    <a href="https://a.app.qq.com/o/dom/micro/downBase.jsp?pkgname=com.lhave.wzq" id="yyb" class="row" v-if="d.is_android==true">
      <img class="img" v-bind:src="image.download_yyb" mode="widthFix"/>
    </a>
    <img class="bt_img" v-bind:src="image.download_bottom" mode="widthFix"/>
  </div>
</template>

<script>
  var d = {
    token:'',
    dw_link:'',
    is_android:true
  };
export default {
  data () {
    return {
      d
    }
  },
  components: {

  },
  methods: {
    init_link(){
      var sys;
      try{
        sys = navigator.userAgent;
      }
      catch (e) {
        wx.getSystemInfo({
          success(res){
            sys = res.model;
          }
        });
      }
      var res,isAndroid;

      this.request({
        method:'get',
        url:this.$url['download']['downloadURL'],
        dataType:'json',
        success:function(res){
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if(res_.status==1){
            isAndroid = sys.indexOf('Android')!=-1 || sys.indexOf('Adr')!=-1 ? true : false;
            d.is_android = isAndroid;
            d.dw_link = isAndroid===true ? res_.data['path'] : res_.data('ios_url');
          }
          else{

          }
        }
      });
    }
  },
  created () {

  },
  mounted () {
      // console.log(99966666, this.$route, this.$root.$mp)
    this.init_link();
  }
}
</script>

<style lang="less">
  @bg_color:#efefef;
  @f_back:#5d5d5d;
  @f_gray:#6e6e6e;
  @f_green:#0fca9d;
  @f_red:#fa6969;
  @f_dgray:#cdcdcd;
  @size:20rem;
  #invite-all{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: white;
    overflow: hidden;
    >.img{
      display: block;
      position: absolute;
      z-index: 100;
      width: 73.33%;
      height: auto;
      left: 13.2%;
      top: 50/@size;
    }
    #down-out{
      position: absolute;
      width: 46.66%;
      left: 26.8%;
      top: 271/@size;
      z-index: 230;
      #down-award{
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        >.img{
          position: relative;
          width: 100%;
        }
      }
    }
    #yyb{
      position: absolute;
      width: 25.2%;
      left: 37.4%;
      top: 336/@size;
      z-index: 560;
      >.img{
        position: relative;
        width: 100%;
      }
    }
    >.bt_img{
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
</style>
