<template>
  <div id="web-all">
    <ol class="web-article">
      <li class="web-item">
        <div class="left circle"></div>
        <div class="content">
          <p class="shape"></p>
          <h3 class="title"><p class="cont">标题</p></h3>
          <div class="text"><p class="cont">文章描述</p></div>
          <p class="time">2019-10-1</p>
        </div>
        <p class="left-origin"></p>
        <div class="right circle" @click="frontAnimate(0)">svg</div>
      </li>
    </ol>
  </div>
</template>

<script>

import $ from '../../utils/jquery.min'
export default {
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    frontAnimate(ord){
      var item = $(".web-item").eq(ord);
      var item_cont = item.children(".content").eq(0);
      item.animate({width:520},500);
      item_cont.animate({width:400},500);
      setTimeout(()=>{
        item_cont.find('.cont').eq(0).animate({left:130,opacity:1},300);
        item_cont.find('.cont').eq(1).animate({left:160,opacity:1},300);
      },300);
      setTimeout(()=>{
        item_cont.find('.time').eq(0).animate({right:50},400);
        item_cont.find('.cont').eq(0).animate({left:100,opacity:1},500);
        item_cont.find('.cont').eq(1).animate({left:130,opacity:1},500);
      },600);
    },
    backAnimate(ord){

    }
  },
  created () {

  },
  mounted () {
   // this.frontAnimate(0);
  }
}

</script>

<style lang="less">
  @blue1:#040534;
  @blue2:#1d2088;
  @size:20rem;

#web-all{
  position: relative;
  width: 100%;
  padding-left: 150px;
  >.web-article{
    position: relative;
    width: 100%;
    >.web-item{
      position: relative;
      width: 220px;
      height: 110px;
      margin: 50px;
      >.content{
        position: relative;
        width: 110px;
        height: 110px;
        left: 55px;
        border-bottom: 10px solid @blue1;
        z-index: 5;
        >.shape{
          position: absolute;
          width: 70px;
          height:100%;
          background: @blue2;
          z-index: 120;
          &:after{
            content: '';
            position: absolute;
            height: 0;
            width: 0;
            border-left: 100px solid @blue2;
            border-top:100px solid transparent;
            right: -100px;
            top: 0;
          }
        }
        >.title{
          position: relative;
          >.cont{
            position: relative;
            display: inline-block;
            font-size: 16px;
            color: white;
            padding: 2px 15px;
            left: 0;
            background: @blue2;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
            opacity: 0;
          }
        }
        >.text{
          position: relative;
          margin-top: 5px;
          >.cont{
            position: relative;
            display: inline-block;
            font-size: 14px;
            color: white;
            padding: 2px 15px;
            left: 0;
            background: @blue2;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
            opacity: 0;
          }
        }
        >.time{
          position: absolute;
          padding: 3px 16px;
          font-size: 12px;
          color: white;
          background: @blue2;
          -webkit-border-radius: 15px;
          -moz-border-radius: 15px;
          border-radius: 15px;
          bottom: 5px;
          right: 0;
        }
      }
      >.circle{
        position: absolute;
        width: 110px;
        height: 110px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background: @blue2;
        border: 10px solid @blue1;
        text-align: center;
        line-height:90px;
        font-size: 16px;
        color: white;
      }
      >.left{
        left: 0;
        top: 0;
        z-index: 2;
      }
      >.right{
        right: 0;
        top: 0;
        z-index: 18;
      }
      >.left-origin{
        position: absolute;
        height: 80px;
        width: 80px;
        background: white;
        border-radius: 50%;
        left: 15px;
        top: 15px;
        z-index: 50;
      }
    }
  }
}
</style>
