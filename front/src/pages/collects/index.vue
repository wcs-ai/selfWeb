<template>
  <div id="collects-all">
    这里是收藏
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
  computed:{

  },
  methods: {

  },
  created () {

  },
  mounted () {
    this.alter_navIndex(3);
    this.alter_nav('block');
    if(this.env==='pc'){
      $("#pc-nav").css({display:'block'});
      $("#view-content").css({marginTop:'55px'});
    }
  }
}
</script>
<!--需要使用less语言来写css-->
<style lang="less">
  @bg_color:#efefef;
  @f_back:#5d5d5d;
  @f_gray:#6e6e6e;
  @f_green:#0fca9d;
  @f_red:#fa6969;
  @f_dgray:#cdcdcd;
  @size:20rem;

</style>
