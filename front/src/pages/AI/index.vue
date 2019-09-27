<template>
  <div id="AI-all">
      <ul class="ai-list">
        <li class="ai-item row" @click="to_page('../pages/etcTime/main')" v-for="(ai,ab) in AIList" :key="ab">
          <div class="head row-left">
            <svg class="svg">
              <ellipse class="face_out" :style="{fill:ai.color,cx:ai.ellipse.cx,cy:ai.ellipse.cy,rx:ai.ellipse.rx,ry:ai.ellipse.ry}"/>
            </svg>
            <div class="head-in">
              <div class="circle"></div>
              <p class="eye"></p>
              <div class="top"><p :style="{background:ai.color2}"></p></div>
              <div class="bot"><p :style="{background:ai.color2}"></p></div>
            </div>
          </div>
          <div class="content row-left" :style="{background:ai.color}">
            <h3 class="title">{{ ai.title }}</h3>
            <p class="descript">{{ ai.descript }}</p>
            <p class="time">{{ ai.time }}</p>
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
      this.alter_navIndex(2);
      this.alter_nav('block');
      // if(this.env==='pc'){
      //   $("#pc-nav").css({display:'block'});
      //   $("#view-content").css({marginTop:'55px'});
      // }
      this.AIList.forEach((val,index)=>{
        val['animate'] = new eye_animate(index);
      });
    }
  }

  var ww = window.innerWidth;
  function eye_animate(el_ord){
    this.el_index = el_ord;
    this.el = $(".eye").eq(this.el_index);
    this.implement();
  }
  eye_animate.prototype = {
    el:'',
    implement:function(){
      var w,lf,tp,tran;

      if(ww>768){
        lf = Math.round(Math.random()*50)+20;
        tp = Math.round(Math.random()*10)+50;
        w = 10 - Math.round(Math.abs(45-lf)*0.2);
        tran = 30 - tp;
      }
      else{
        lf = Math.round(Math.random()*40)+10;
        tp = Math.round(Math.random()*8)+42;
        w = 8 - Math.round(Math.abs(30-lf)*0.2);
        tran = 46 - tp;
      }

      this.el.css({transform:'rotateX('+ tran +'deg)'});
      this.el.animate({top:tp,left:lf,width:w},500);
      setTimeout(()=>{this.implement()},1000);

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
        margin: 60px auto;
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
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //设置行数
            -webkit-box-orient: vertical;
          }
          >.time{
            position: absolute;
            width: 150px;
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            padding-right: 10px;
           // background: @blue2;
            color: white;
            bottom: 0;
            right: 0;
            text-align: right;
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

  @media only screen and (min-width: 300px) and (max-width: 999px){
    #AI-all{
      >.ai-list{
        >.ai-item{
          width: 95%;
          margin: 20/@size auto;
          >.head{
            height: 100/@size;
            >.svg{
              width: 100%;
              height: 100/@size;
            }
            >.head-in{
              height: 100/@size;
              left: 20/@size;
              >.circle{
                width: 50/@size;
                height: 50/@size;
                top: 25/@size;
                left: 10/@size;
              }
              >.eye{
                width: 8/@size;
                height: 8/@size;
                top: 47px;
                left: 30px;
              }
              >.top{
                width: 70/@size;
                height: 35/@size;
                top:10/@size;
                left: 0;
                >p{
                  height: 70/@size;
                }
              }
              >.bot{
                width: 60/@size;
                height: 30/@size;
                bottom: 10/@size;
                left:5/@size;
                >p{
                  height: 60/@size;
                }
              }
            }
          }
          >.content{
            width: 80%;
            height: 100/@size;
            padding: 5/@size 5/@size 5/@size 50/@size;
            border-top-right-radius: 15/@size;
            border-bottom-right-radius: 15/@size;
            >.title{
              font-size: 14/@size;
            }
            >.descript{
              padding: 5/@size 0;
              font-size: 14/@size;
            }
            >.time{
              position: absolute;
              width: 150/@size;
              height: 25/@size;
              line-height: 25/@size;
              font-size: 12/@size;
              // background: @blue2;
              color: white;
              bottom: 0;
              right: 0;
              text-align: right;
              padding-right: 10/@size;
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
  }
</style>
