<template>
  <div id="heart-all">
    <div class="center">
      <h2 class="word">请先输入密码：</h2>
      <p class="p"><input class="inp" type="password" placeholder="ENTER KEY"/></p>
    </div>
  </div>
</template>
  <script>

  export default {
  data () {
    return {

    }
  },
  components: {
    // 定义组件
  },
  computed:{

  },
  methods: {

  },
  created () {

  },
  onLoad(){

  },
  mounted () {
    this.alter_navIndex(4);
    this.alter_nav('block');
    if(this.env==='pc'){
      $("#pc-nav").css({display:'block'});
      $("#view-content").css({marginTop:'55px'});
    }
  }
}
</script>

<style lang="less">
  @back1:#1f1d20;
  @back2:#535155;
  @purple:#7224a3;
  @blue1:#040534;
  @blue2:#053f85;
  @blue3:#1d2088;
  @size:20rem;

  #heart-all{
    position: relative;
    width: 100%;
    >.center{
      position: relative;
      width: 300px;
      margin: 300px auto;
      >.word{
        position: relative;
        font-size: 16px;
        color: @blue1;
        padding: 15px 0;
      }
      >.p{
        position: relative;
        width: 100%;
        border: 1px solid @blue1;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        overflow: hidden;
        >.inp{
          position: relative;
          height: 35px;
          padding: 0 10px;
          font-size: 14px;
          width: 100%;
        }
      }
    }

  }

  @media only screen and (min-width: 300px) and (max-width: 999px){
    #heart-all{
      >.center{
        width: 100%;
        margin: 300/@size auto;
        padding: 10/@size;
        >.word{
          font-size: 14/@size;
          color: @blue1;
          padding: 15/@size 0;
        }
        >.p{
          >.inp{
            height: 35/@size;
            padding: 0 10/@size;
            font-size: 14/@size;
          }
        }
      }
    }
  }
</style>
