<template>
  <!--一些标签不能使用,v-html不能用,不能使用href之类的跳转,不能用router-view,最外层必须用一个div元素包起来-->
  <div id="host-all">
      <div id="head">
        <div class="head-content">
          <h3 class="super">[ super ]</h3>
          <ul class="banner"><li>最近好友生日：</li></ul>
          <h2 class="word">奋斗--辉煌人生,科技--改变世界。</h2>
        </div>
      </div>
      <div id="body">
        <h3 class="part-title">[ part ]</h3>
        <ul class="part-list row">
          <li class="item1 row-left"><hart :artInfo="article"></hart></li>
          <li class="item2 row-right"><hart :artInfo="article"></hart></li>
          <li class="item3 row-left"><hart :artInfo="article"></hart></li>
          <li class="item4 row-right"><hart :artInfo="article"></hart></li>
        </ul>
      </div>
  </div>
</template>
<script>
import hart from '../../components/homeART'
export default {
    data () {
      return {
        article:{
          title:'文章',
          tag:'AI',
          description:'描述',
          time:'2019-09-13'
        }
      }
    },
    methods: {

  },
  components: {
    hart
  },
  created () {

  },
  onLoad(){
      //小程序页面加载后调用函数
  },
  mounted () {
    //web,wx初始化方法入口
    if(this.env==='pc'){
      $("#pc-nav").css({display:'block'});
      $("#view-content").css({marginTop:'55px'});
    }
  }
}

</script>
<style lang="less">
  @black1:#1f1d20;
  @black2:#313131;
  @black3:#535155;
  @black4:#7d7d7d;
  @purple:#7224a3;
  @size:20rem;

  #host-all{
    position: relative;
    width: 100%;
    padding-bottom: 56px;
    #head{
      position: relative;
      width: 100%;
      >.head-content{
        position: relative;
        width: 650px;
        margin: 0 auto;
        >.super{
          position: relative;
          font-size: 18px;
          padding: 15px 0;
        }
        >.banner{
          position: relative;
          height: 200px;
          overflow: hidden;
          >li{
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 15px;
            background: @black1;
            color: white;
            font-size: 16px;
          }
        }
        >.word{
          position: relative;
          font-size: 18px;
          padding: 15px 0;
        }
      }
    }
    #body{
      position: relative;
      width: 650px;
      margin: 20px auto;
      >.part-title{
        position: relative;
        width: 100%;
        padding: 15px 0;
        font-size: 18px;
      }
      >.part-list{
        position: relative;
        >.item1{
          position: relative;
          width: 355px;
          color: white;
          margin-bottom: 15px;
        }
        >.item2{
          position: relative;
          width: 280px;
          margin-bottom: 15px;
        }
        >.item3{
          position: relative;
          width: 280px;
          margin-bottom: 15px;
        }
        >.item4{
          position: relative;
          width: 355px;
          margin-bottom: 15px;
        }
      }
    }
  }

  @media only screen and (min-width: 300px) and (max-width: 768px) {
    #host-all{
      width: 100%;
      #head{
        >.head-content{
          width: 90%;
          >.super{
            font-size: 16/@size;
            padding: 10/@size 0;
          }
          >.banner{
            height: 160/@size;
            >li{
              padding: 10/@size;
              font-size: 14/@size;
            }
          }
          >.word{
            font-size: 16/@size;
            padding: 10/@size 0;
          }
        }
      }
      #body{
        width: 100%;
        >.part-title{
          font-size: 18/@size;
          padding: 10/@size 5%;}
        >.part-list{
          >.item1,.item2,.item3,.item4{
            float: none;
            width: 90%;
            margin: 0 auto 15/@size auto;
          }
        }
      }
    }
  }
</style>
