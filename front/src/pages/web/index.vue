<template>
  <div id="web-all">
    <ol class="web-article">
      <li class="web-item" v-for="(web,index) in webList" @click="to_article()">
        <div class="left circle"></div>
        <div class="content">
          <p class="shape"></p>
          <h3 class="title"><p class="cont">{{ web.title }}</p></h3>
          <div class="text"><p class="cont">{{ web.descript }}</p></div>
          <p class="time">{{ web.time }}</p>
        </div>
        <p class="left-origin"></p>
        <div class="right circle" @click="frontAnimate(index)">svg</div>
      </li>
    </ol>
  </div>
</template>

<script>

import $ from '../../utils/jquery.min'
export default {
  data () {
    return {
      ch:700,
      st_ord:0,
      can_scroll:true
    }
  },
  components: {

  },
  methods: {
    frontAnimate(ord){
      var item = $(".web-item").eq(ord);
      var item_cont = item.children(".content").eq(0);
      var w1,w2,lef1,lef2,lef3,lef4,rg1;
      //记住加载到第几项
      this.st_ord += 1;
      if(this.env==='pc'){
        w1 = 520;
        w2 = 410;
        lef1 = 130;
        lef2 = 160;
        lef3 = 95;
        lef4 = 120;
        rg1 = 50;
      }
      else{
        w1 = this.ww*0.96;
        w2 = w1 - (this.ww*77)/375;
        lef1 = (this.ww*100)/375;
        lef2 = (this.ww*130)/375;
        lef3 = (this.ww*65)/375;
        lef4 = (this.ww*85)/375;
        rg1 = (this.ww*40)/375;
      }
      item.animate({width:w1},500);
      item_cont.animate({width:w2},500);
      setTimeout(()=>{
        item_cont.find('.cont').eq(0).animate({left:lef1,opacity:1},300);
        item_cont.find('.cont').eq(1).animate({left:lef2,opacity:1},300);
      },300);
      setTimeout(()=>{
        item_cont.find('.time').eq(0).animate({right:rg1},400);
        item_cont.find('.cont').eq(0).animate({left:lef3,opacity:1},500);
        item_cont.find('.cont').eq(1).animate({left:lef4,opacity:1},500);
      },600);
    },
    check_view(){
    	//检查哪些元素进入视图，加载动画
      var its = document.getElementsByClassName("web-item");
      var wa = document.getElementById("web-all").scrollTop;

			for(var c=this.st_ord,el_arr=[];c<its.length;c++){
      		if(its[c].offsetTop<(this.ch+wa-50)){
      			el_arr.push(c);
          }
      	if(c===its.length-1){
      		this.start_quee(el_arr);
      	}
      }

    },
    start_quee(els){
      //队列动画开始
      els.forEach((item,index)=>{
        setTimeout(()=>{
          this.frontAnimate(item);
        },index*100);
      });
    },
    to_article(){
      var host = window.location.host;

    },
    backAnimate(ord){

    }
  },
  created () {

  },
  mounted () {
    $("#pc-nav").css({display:'block'});
    $("#view-content").css({marginTop:'55px'});
    $(document.body).scroll(this.check_view);
    this.nav_index = 1;
    if(this.env==='pc'){
      this.ch = this.sh - 170;
    }
    else{
      this.ch = this.sh;
    }
    this.check_view();
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
  padding:1px 150px 1px 150px;
  >.web-article{
    position: relative;
    width: 100%;
    padding: 1px;
    margin-left: 70px;
    >.web-item{
      position: relative;
      width: 220px;
      height: 110px;
      margin: 70px 0;
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
            border-left: 70px solid @blue2;
            border-top:100px solid transparent;
            right: -70px;
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
            padding: 1px 15px;
            left: 0;
            background: @blue2;
            border-bottom-left-radius: 15px;
            opacity: 0;
          }
        }
        >.text{
          position: relative;
          margin-top: 3px;
          >.cont{
            position: relative;
            display: inline-block;
            font-size: 14px;
            color: white;
            padding: 1px 15px;
            left: 0;
            background: @blue2;
            border-bottom-left-radius: 15px;
            opacity: 0;
          }
        }
        >.time{
          position: absolute;
          padding: 1px 16px;
          font-size: 12px;
          color: white;
          background: @blue2;
          bottom: 3px;
          right: 0;
          border-top-right-radius: 10px;
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

  @media only screen and (min-width: 300px) and (max-width: 999px){
    #web-all{
      padding: 1px;
      >.web-article{
        margin-left: 0;
        >.web-item {
          width: 154/@size;
          height: 77/@size;
          margin: 50/@size 0;
          left: 2%;
          >.content{
            width: 77/@size;
            height: 77/@size;
            left: 38/@size;
            border-bottom: 5/@size solid @blue1;
            >.shape{
              width: 50/@size;
              height:100%;
              &:after{
                content: '';
                position: absolute;
                height: 0;
                width: 0;
                border-left: 40/@size solid @blue2;
                border-top:72/@size solid transparent;
                right: -40/@size;
                top: 0;
              }
            }
            >.title{
              >.cont{
                font-size: 14/@size;
                padding: 1px 10/@size;
                font-weight: 500;
                border-bottom-left-radius: 15/@size;
              }
            }
            >.text{
              margin-top: 3/@size;
              >.cont{
                font-size: 14/@size;
                padding: 1px 10/@size;
                line-height: 16/@size;
                font-weight: 500;
                max-width: 50%;
                border-bottom-left-radius: 15/@size;
              }
            }
            >.time{
              display: none;
              padding: 1px 10/@size;
              font-size: 12/@size;
              -webkit-border-radius: 15/@size;
              -moz-border-radius: 15/@size;
              border-radius: 15/@size;
              bottom: 3/@size;
            }
          }
          >.circle{
            position: absolute;
            width: 77/@size;
            height: 77/@size;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            border: 5/@size solid @blue1;
            line-height:50/@size;
            font-size: 16/@size;
          }
          >.left-origin{
            height: 56/@size;
            width: 56/@size;
            left: 10/@size;
            top: 11/@size;
          }
        }
      }
    }
  }
</style>
