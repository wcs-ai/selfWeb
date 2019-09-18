<template>
  <div id="AI-all">
      <ul class="ai-list">
        <li class="ai-item row" @click="to_page('../pages/etcTime/main')">
          <div class="head row-left">
            <svg class="svg">
              <ellipse class="face_out" style="fill:#1f1d20;cx:104;cy:60;rx:65;ry:60;"/>
<!--              <ellipse class="face_in" cx="90" cy="60" rx="40" ry="50" style="fill:#053f85;"/>-->
<!--              <ellipse class="eye_lef" cx="70" cy="40" rx="5" ry="8" style="fill:white;"/>-->
<!--              <ellipse class="eye_right" cx="100" cy="40" rx="5" ry="8" style="fill:white;"/>-->
<!--              <ellipse class="mouth" cx="85" cy="90" rx="3" ry="5" style="fill:white;"/>-->
            </svg>
            <div class="head-in">
              <div class="circle"></div>
              <p class="eye"></p>
              <div class="top"><p></p></div>
              <div class="bot"><p></p></div>
            </div>
          </div>
          <div class="content row-left">
            <h3 class="title">盲目搜索之九拼图</h3>
            <p class="descript">盲目搜索的运用。</p>
            <p class="time">2019-11-1</p>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        animate:{
          face_out:{},
          face_in:{},
          eye_lef:{},
          eye_rig:{},
          mouth:{}
        }
      }
    },
    methods:{
      select_el(idx){
        var fo = document.getElementsByClassName("face_out")[idx];
        var fi = document.getElementsByClassName("face_in")[idx];
        var ef = document.getElementsByClassName("eye_left")[idx];
        var er = document.getElementsByClassName("eye_right")[idx];
        var mh = document.getElementsByClassName("mouth")[idx];
        return [fo,fi,ef,er,mh];
      },
      implement(el,ord){
        var [fo,fi,ef,er,mh] = this.select_el(el);

        switch (ord) {
          case 0:
            fo.style.rx = 80;
            this.implement(el,ord+1);
            break;
          case 1:
            fo.style.ry = 80;
            break;
        }
      },
      eye_animate(ord){
        var eye = $(".eye").eq(0);
        var w,lf;

        switch (ord) {
          case 0:
            lf = 35;
            w = 10 - Math.round(Math.abs(45-lf)*0.2);
            eye.animate({top:50,left:lf,width:w},300);
            break;
          case 1:
            lf = 20;
            w = Math.round(Math.abs(45-lf)*0.4);
            eye.animate({top:60,left:lf,width:w},500);
            break;
          case 2:
            lf = 40;
            w = Math.round(Math.abs(45-lf)*0.4);
            eye.animate({top:50,left:lf,width:w},500);
            break;
        }

      }
    },
    components:{

    },
    created(){

    },
    onLoad(){

    },
    mounted(){
      //this.implement(0,0);
      //this.eye_animate(0);
      $("#pc-nav").css({display:'block'});
      $("#view-content").css({marginTop:'55px'});
      var av = new eye_animate(0,0);
    }
  }

  function eye_animate(el_ord,ord){
    this.el_index = el_ord;
    this.el = $(".eye").eq(this.el_index);
    this.implement(ord);
  }
  eye_animate.prototype = {
    el:'',
    implement:function(ord){
      var w,lf,tp;
      var ran = Math.round( Math.random()*6);
      switch (ord) {
        case 0:
          lf = 45;
          w = 10 - Math.round(Math.abs(45-lf)*0.2);
          tp = 55;
          break;
        case 1:
          lf = 35;
          w = 10 - Math.round(Math.abs(45-lf)*0.2);
          tp = 50;
          break;
        case 2:
          lf = 20;
          w = 10 - Math.round(Math.abs(45-lf)*0.2);
          tp = 60;
          break;
        case 3:
          lf = 55;
          w = 10 - Math.round(Math.abs(45-lf)*0.2);
          tp = 60;
          break;
        case 4:
          lf = 70;
          w = 10 - Math.round(Math.abs(45-lf)*0.2);
          tp = 50;
          break;
        case 5:
          lf = 20;
          w = 10 - Math.round(Math.abs(45-lf)*0.2);
          tp = 50;
          break;
        case 6:
          lf = 70;
          w = 10 - Math.round(Math.abs(45-lf)*0.2);
          tp = 60;
          break;
      }
      this.el.animate({top:tp,left:lf,width:w},500);
      setTimeout(()=>{this.implement(ran)},1000);
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

  #AI-all{
    position: relative;
    padding: 1px;
    >.ai-list{
      position: relative;
      width: 100%;
      >.ai-item{
        width: 520px;
        margin: 20px auto;
        >.head{
          width: 20%;
          height: 120px;
          z-index: 20;
          >.svg{
            position: absolute;
            width: 200px;
            height: 120px;
            z-index: 5;
            >.face_out{
              -webkit-transition: all 1s linear;
              -moz-transition: all 1s linear;
              -ms-transition: all 1s linear;
              -o-transition: all 1s linear;
              transition: all 1s linear;
            }
          }
          >.head-in{
            position: absolute;
            width: 100%;
            height: 120px;
            top: 0;
            z-index: 15;
            left: 40px;
            >.circle{
              position: absolute;
              width: 60px;
              height: 60px;
              background: white;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              top: 30px;
              left: 20px;
              z-index: 2;
            }
            >.eye{
              position: absolute;
              width: 10px;
              height: 10px;
              background: blue;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              top: 55px;
              left: 45px;
              z-index: 8;
            }
            >.top{
              position: absolute;
              width: 80px;
              height: 40px;
              overflow: hidden;
              top:10px;
              left: 10px;
              z-index: 12;
              >p{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 80px;
                background: deepskyblue;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
              }
            }
            >.bot{
              position: absolute;
              width: 70px;
              height: 35px;
              overflow: hidden;
              bottom: 15px;
              left: 15px;
              z-index: 12;
              >p{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 70px;
                background: deepskyblue;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
              }
            }
          }
        }
        >.content{
          width: 80%;
          height: 120px;
          padding: 10px 10px 10px 70px;
          background: @back1;
          z-index: 5;
          >.title{
            position: relative;
            font-size: 16px;
            color: white;
          }
          >.descript{
            padding: 5px 0;
            font-size: 14px;
            color: white;
            position: relative;
          }
          >.time{
            position: absolute;
            width: 150px;
            height: 25px;
            line-height: 25px;
            font-size: 12px;
           // background: @blue2;
            color: white;
            bottom: 0;
            right: 0;
            text-align: center;
            &:before{
              content: '';
              position: absolute;
              width:0;
              height: 0;
             // border-right: 20px solid @blue2;
              border-top: 25px solid transparent;
              top: 0;
              left: -20px;
            }
          }
        }
      }
    }
  }
</style>
