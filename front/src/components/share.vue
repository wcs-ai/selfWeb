<template>
  <div class="share_component">
    <div class="row">
      <a class="el-w-4" @click="click_repeat()" v-if="show_headBar==true">
        <img class="img" mode="widthFix" v-bind:src="image.share_url"/>
        <p class="p" v-bind:style="{ color:col }">{{ word }}</p>
      </a>
      <a class="el-w-4" v-bind:href="child_share.xl" v-if="show_headBar==true">
        <img class="img" mode="widthFix" v-bind:src="image.share_xl"/>
        <p class="p">新浪微博</p>
      </a>
      <a class="el-w-4" v-bind:href="child_share.qq" v-if="show_headBar==true">
        <img class="img" mode="widthFix" v-bind:src="image.share_qq"/>
        <p class="p">QQ好友</p>
      </a>
      <a class="el-w-4" v-bind:href="child_share.qqSpace" v-if="show_headBar==true">
        <img class="img" mode="widthFix" v-bind:src="image.share_qqSpace"/>
        <p class="p">QQ空间</p>
      </a>
      <button class="el-w-4 button" v-if="show_headBar==false" open-type="share">
        <img class="img" mode="widthFix" v-bind:src="image.share_wx"/>
        <p class="p">微信好友</p>
      </button>
    </div>
  </div>
</template>
<script>

export default {
  props:['value'],
  data () { // 选项 数据
    return {
      col:'#5d5d5d',
      word:'复制链接',
      qq:'',
      url_:'',
      qqSpace:'',
      xl:'',
      child_share:{
        url_:'',
        qq:'',
        qqSpace:'',
        xl:''
      }
    }
  },
  components: {
    // 定义组件

  },
  methods: {
    // 事件处理方法
    click_repeat(){
      //点击复制链接
      if(this.environment()==='web'){
        var inp = document.createElement('input');
        inp.value = this.child_share.url_;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand('Copy');
        inp.style.display = "none";
      }
      else{
        this.wx_copy(this.child_share.url_);
      }
      this.$emit('repeat');
      this.col='#0fca9d';
      this.word = '已复制';
    }
  },
  created () {

    },
    mounted () {

    },
    watch:{
      value(newdata,olddata){
        // this.qq = 'err';
        // this.qqSpace = newdata;
        // this.xl = newdata;
        this.child_share = newdata;
        this.child_share.url_ = newdata.url_;
      }
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
  @b_gray:#dddddd;
  @r_size:19rem;
  @w1:56rem;
  @size:20rem;
  .share_component{
    position: relative;
    width: 100%;
    >.row{
      width: 100%;
      >.el-w-4{
        color: @f_back;
        >.img{
          position: relative;
          width: 58.66%;
          display: block;
          margin: 0 auto;
        }
        >.p{
          position: relative;
          width: 100%;
          color: black;
          text-align: center;
          font-size: 16/@size;
          padding: 0.5rem 0;
        }
      }
      >.button{
        margin: 0;
        padding: 0;
        background: white;
        border: none;
        outline: none;
        list-style: none;
      }
    }
  }
</style>
