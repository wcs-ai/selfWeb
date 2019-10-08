<template>
  <div class="home-art">
    <h3 class="title">{{ artInfo.title }}</h3>
    <p class="content">{{ artInfo.description }}</p>
    <p class="time">{{ artInfo.time }}</p>
    <p class="tag">{{ artInfo.tag }}</p>
  </div>
</template>
<script>

export default {
  props:{
    artInfo:{
      title:'文章',
      tag:'AI',
      description:'描述',
      time:'2019-09-13'
    }
  },
  data () { // 选项 数据
    return {

    }
  },
  components: {
    // 定义组件

  },
  methods: {

  },
  created () {

    },
    mounted () {

    },
    watch:{

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
  .home-art{
    position: relative;
    width: 100%;
    background: @black2;
    padding: 15px;
    color: white;
    height: 128px;
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    -ms-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    transition: all 0.3s linear;
    background: @black2;
    >.title{
      position: relative;
      color: white;
      font-size: 16px;
      text-align: left;
    }
    >.content{
      position: relative;
      color: white;
      font-size: 14px;
      text-align: left;
      padding-left: 25px;
    }
    >.time{
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      padding: 10px;
      font-size: 12px;
      color: white;
      text-align: right;
    }
    >.tag{
      position: absolute;
      width: 100px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: white;
      top: 19px;
      font-size: 14px;
      right: -4px;
      background: @black3;
      -webkit-transform: rotate(30deg);
      -moz-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
      -o-transform: rotate(30deg);
      transform: rotate(30deg);
      &:before{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-right: 40px solid @black3;
        border-top: 25px solid transparent;
        left: -39px;
        top: 0;
      }
      &:after{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-left: 15px solid @black3;
        border-top: 25px solid transparent;
        right: -14px;
        top: 0;
      }
    }
    &:active{
      -webkit-transform: scale(0.8);
      -moz-transform: scale(0.8);
      -ms-transform: scale(0.8);
      -o-transform: scale(0.8);
      transform: scale(0.8);
    }
  }

  @media only screen and (min-width: 300px) and (max-width: 999px) {
    .home-art{
      height: 128/@size;
      padding: 15/@size;
      >.title{font-size:16/@size;}
      >.content{
        font-size: 14/@size;
        padding-left: 24/@size;
      }
      >.time{
        font-size: 12/@size;
      }
      >.tag{
        height: 25/@size;
        line-height: 25/@size;
        top: 19/@size;
        right: -4/@size;
        width: 100/@size;
        &:before{
          content: '';
          border-right: 40/@size solid @black3;
          border-top: 25/@size solid transparent;
          left: -39/@size;
        }
        &:after{
          content: '';
          border-left: 15/@size solid @black3;
          border-top: 25/@size solid transparent;
          right: -14/@size;
        }
      }
    }
  }
</style>
