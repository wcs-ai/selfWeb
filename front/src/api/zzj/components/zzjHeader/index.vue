<template id='zzjHeader'>
  <!--一些标签不能使用,v-html不能用,不能使用href之类的跳转,不能用router-view,最外层必须用一个div元素包起来-->
    <div class='header'>  
      <div class='title'>{{title}}</div>
      <div class='back'>
        <img :src='back' style="width:0.6rem;height:1.1rem;">
      </div>
  </div>
</template>
<script>
let file;
export default {
  data() {
    // 选项 数据,return当中写数据
    return {
      get back(){
        return file+'back1.png';
      }
    };
  },
  props:{
    title:String
  },
  components: {
    // 定义组件
  },
  methods: {
  },
  created() {
    file=this.$zzj.imgurl+'zzjTaShop/';
  },
  mounted() {
    
  }
};
</script>
<!--需要使用less语言来写css-->
<style scoped lang="less">
@bg_color: #efefef;
@green:#0fca9d;



.header{
  color: #333333;
  font-size: 1.05rem;
  text-align: center;
  background: #fff;
  height:3rem;
  >.title{
    position:relative;
    top:0.75rem;
  }
  >.back{
    position:absolute;
    left:0.5rem;
    top:1rem;
  }
}
</style>
