<template>
  <!--一些标签不能使用,v-html不能用,不能使用href之类的跳转,不能用router-view,最外层必须用一个div元素包起来-->
  <div id="host-all">
      <div id="head">
        科技，改变世界。
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
      height: 300px;
      width: 100%;
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
