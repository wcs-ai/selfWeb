<template>
  <!--将src文件下的pages>home>index.vue中template下的元素拿到这个页面的router-view中
  然后将index.vue中的css部分加入到这个页面的头部中-->
  <div id="app">
    <div id="pc-nav" v-if="showNAV==true">
      <div class="content row">
        <p class="nav-word el-w-5" :class="{here:nav_index==0}" @click="navTo('pages/home/main',0)">首页</p>
        <p class="nav-word el-w-5" :class="{here:nav_index==1}" @click="navTo('pages/web/main',1)">web</p>
        <p class="nav-word el-w-5" :class="{here:nav_index==2}" @click="navTo('pages/AI/main',2)">人工智能</p>
        <p class="nav-word el-w-5" :class="{here:nav_index==3}" @click="navTo('pages/collects/main',3)">收藏</p>
        <p class="nav-word el-w-5" :class="{here:nav_index==4}" @click="navTo('pages/heart/main',4)">心灵世界</p>
      </div>
    </div>
    <div id="view-content" :style="{ minHeight:vch+'px' }">
      <router-view></router-view>
    </div>
    <div id="ph-nav" v-if="showNAV==true">
      <canvas id="ph-bt-canvas" :width="bt_canvas.w" :height="bt_canvas.h"></canvas>
      <ol class="content">
        <li class="nav-word el-w-5" :class="{here_style:nav_index==0}" @click="navTo('pages/home/main',0)"><p class="iconfont">&#xe602;</p><span>首页</span></li>
        <li class="nav-word el-w-5" :class="{here_style:nav_index==1}" @click="navTo('pages/web/main',1)"><p class="iconfont">&#xe643;</p><span>web</span></li>
        <li class="nav-word el-w-5" :class="{here_style:nav_index==2}" @click="navTo('pages/AI/main',2)"><p class="iconfont">&#xe686;</p><span>人工智能</span></li>
        <li class="nav-word el-w-5" :class="{here_style:nav_index==3}" @click="navTo('pages/collects/main',3)"><p class="iconfont">&#xe62e;</p><span>收藏</span></li>
        <li class="nav-word el-w-5" :class="{here_style:nav_index==4}" @click="navTo('pages/heart/main',4)"><p class="iconfont">&#xe742;</p><span>heart</span></li>
      </ol>
    </div>
  </div>
</template>
<script>
  function takeSize(){
    // 改变html字体大小这样才能,375/20 = 18.9 ; width/23.4 = font-size
    document.documentElement.style.fontSize = (window.innerWidth*20)/375 + 'px';
  }
  takeSize();
  window.onresize = function(){
      takeSize();
  };
  export default {
    name: 'wcs'
}

</script>

<style lang="less">
  @back1:#1f1d20;
  @back2:#535155;
  @purple:#7224a3;
  @green1:#26d4aa;
  @green2:#53e8c4;
  @green3:#66f0cf;
  @size:20rem;

  @import "../node_modules/iview/dist/styles/iview.css";
  /******reset********/
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,input,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  ul,ol{list-style-type: none;}
  li{list-style: none;}
  a{text-decoration: none;}
  em,i{font-style: normal;}
  input{
    outline: none;
    border: none;
  }
	button{
		outline: none;
	}
body{
  background: deepskyblue;
}

  #app{
    position: relative;
    width: 100%;
    #view-content{
      position: relative;
      width: 1000px;
      margin: 55px auto 0 auto;
      /*background: rgba(0,1,3,.5);*/
      background: white;
      padding-top: 1px;
      padding-bottom: 20px;
    }
  }
  #pc-nav{
    position: fixed;
    width: 100%;
    background: white;
		z-index: 125;
		left: 0;
		top: 0;
    >.content{
      width: 1000px;
      margin: 0 auto;

      >.nav-word{
        cursor: pointer;
        position: relative;
        text-align: center;
        font-size: 16px;
        color: black;
        height: 40px;
        line-height: 40px;
        &:hover{
          text-decoration: underline;
          color: red;
        }
      }
      >.here{
        color:red;
        font-weight: 600;
        font-size: 16px;
        //background: -webkit-linear-gradient(-30deg,#388eca 0%,#388eca 30%,#b2d6ef 60%,#388eca 100%);
        text-underline: white;
        text-decoration: underline;
      }
    }
  }

  #ph-nav{
    display: none;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 45/@size;
    z-index: 100;
    #ph-bt-canvas{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
    >.content{
      position: absolute;
      z-index: 10;
      width: 100%;
      left: 0;
      top: 0;
      display: flex;
      display:-webkit-flex;
      justify-content: space-between;
      margin-top: 3/@size;
      >.nav-word{
        position: relative;
        text-align: center;
        >p{
          position: relative;
          width: 100%;
          text-align: center;
          color: white;
          font-size: 16/@size;
          height: 20/@size;
        }
        >span{
          position: relative;
          display: block;
          width: 100%;
          font-size: 12/@size;
          color: white;
          text-align: center;
        }
      }
      >.here_style{
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -ms-transform: scale(1.2);
        -o-transform: scale(1.2);
        transform: scale(1.2);
        >p{
          color:@purple;
          text-shadow:0 1px 3px #f7f3fa;
        }
        >span{
          color: @purple;
          text-shadow:0 1px 3px #f7f3fa;
        }
      }
    }
  }
  @media only screen and (min-width: 300px) and (max-width: 999px) {
   #app{
     #view-content{width:100%;}
   }
    #pc-nav{display: none;}
    #ph-nav{display: block;}
  }


  /*网格系统*/
  /*2,3,4,5,6表示同一行有2,3...个元素平分该行,使用它们时它们的父元素使用row能清除浮动,
   * 若想使每个元素间的间隙(包括与边缘间的间隙)是一样的可以在其父元素上用padding: 0 1%;的方法达到*/
  .row{position: relative;}
  .row::after{content: "";display: block;clear: both;}
  .el-w-2,.el-w-3,.el-w-4,.el-w-5,.el-w-6{
    display: block;
    position: relative;
    float: left;
  }
  /*80,85,90,95的使用一般不用在浮动上*/
  .el-w-80,.el-w-85,.el-w-90,.el-w-95,.el-w-70{display: block;position: relative;margin: 0 auto;}
  .el-w-95{width: 95%;}
  .el-w-90{width: 90%;}
  .el-w-85{width: 85%;}
  .el-w-80{width: 80%;}
  .el-w-70{width: 70%;}
  .el-w-2{width: 50%;}
  .el-w-3{width: 33.3%;}
  .el-w-4{width: 25%;}
  .el-w-5{width: 20%;}
  .el-w-6{width: 16.6%;}
  /*项目中同一行左侧图片，右侧文字的情况比较多*/
  .row-left{
    display: block;
    position: relative;
    float: left;
  }
  .row-right{
    display: block;
    position: relative;
    float: right;
  }

  /*提示*/
  #black-back{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(1,0,2,.6);
    top: 0;
    left: 0;
  }

  /*字体配置部分*/
  @font-face {font-family: "iconfont";
    src: url('../static/font/iconfont.eot?t=1568012316865'); /* IE9 */
    src: url('../static/font/iconfont.eot?t=1568012316865#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
    url('../static/font/iconfont.woff?t=1568012316865') format('woff'),
    url('../static/font/iconfont.ttf?t=1568012316865') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('../static/font/iconfont.svg?t=1568012316865#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-twitter3:before {
    content: "\e8aa";
  }

  .icon-web:before {
    content: "\e60e";
  }

  .icon-facebookfacebook52:before {
    content: "\e601";
  }

  .icon-xiangji:before {
    content: "\e670";
  }

  .icon-yuechi:before {
    content: "\e80e";
  }

  .icon-web1:before {
    content: "\e643";
  }

  .icon-AI-:before {
    content: "\e686";
  }

  .icon-wenzhang:before {
    content: "\e742";
  }

  .icon-ai:before {
    content: "\e811";
  }

  .icon-web2:before {
    content: "\e74f";
  }

  .icon-cweb:before {
    content: "\e600";
  }

  .icon-shoucang:before {
    content: "\e62e";
  }

  .icon-shoucang1:before {
    content: "\e613";
  }

  .icon-index-copy:before {
    content: "\e602";
  }
</style>
