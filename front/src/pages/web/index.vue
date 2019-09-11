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
        <div class="right circle"></div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  },
  created () {

  },
  mounted () {

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
  >.web-article{
    position: relative;
    width: 100%;
    margin-left: 150px;
    >.web-item{
      position: relative;
      width: 520px;
      height: 110px;
      margin: 50px;
      >.content{
        position: relative;
        width: 75%;
        height: 110px;
        left: 55px;
        border-bottom: 10px solid @blue1;
        z-index: 5;
        >.shape{
          position: absolute;
          width: 50px;
          height:100%;
          background: @blue2;
          &:before{
            content: '';
            position: absolute;
            width: 80px;
            height: 80px;
            background: white;
            left: -35px;
            top: 15px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
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
            left: 100px;
            background: @blue2;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
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
            left: 120px;
            background: @blue2;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
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
          right: 10%;
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
    }
  }
}
</style>
