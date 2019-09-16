<template>
  <div id="AI-all">
      <ul class="ai-list">
        <li class="ai-item row">
          <div class="head row-left">
            <svg class="svg">
              <ellipse class="ep_out" cx="104" cy="60" rx="60" ry="60" style="fill:#1f1d20;"/>
              <ellipse class="ep_in" cx="90" cy="60" rx="40" ry="50" style="fill:#053f85;"/>
              <ellipse class="eye_lef" cx="70" cy="40" rx="5" ry="8" style="fill:white;"/>
              <ellipse class="eye_right" cx="100" cy="40" rx="5" ry="8" style="fill:white;"/>
              <ellipse class="mouth" cx="85" cy="90" rx="3" ry="5" style="fill:white;"/>
            </svg>
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

      }
    },
    methods:{

    },
    components:{

    },
    created(){

    },
    onLoad(){

    },
    mounted(){

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
            background: @blue2;
            color: white;
            bottom: 0;
            right: 0;
            text-align: center;
            &:before{
              content: '';
              position: absolute;
              width:0;
              height: 0;
              border-right: 20px solid @blue2;
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
