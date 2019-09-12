<template>
  <div id="AI-all">
      <ul class="ai-list">
        <li class="ai-item row">
          <div class="head row-left">
            <svg class="svg"></svg>
          </div>
          <div class="content row-left">
            <h3 class="title">盲目搜索之九拼图</h3>
            <p class="descript">盲目搜索的运用。</p>
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
  @bg_color:#efefef;
  @f_back:#5d5d5d;
  @f_gray:#6e6e6e;
  @f_green:#0fca9d;
  @f_red:#fa6969;
  @f_dgray:#cdcdcd;
  @size:18.75rem;

  #AI-all{
    position: relative;
    >.ai-list{
      position: relative;
      width: 100%;
      >.ai-item{
        width: 520px;
        margin: 20px auto;
        >.head{
          width: 20%;
          height: 150px;
        }
        >.content{
          width: 80%;
          height: 150px;
          padding: 10px;
          background: #000;
        }
      }
    }
  }
</style>
