<template>
  <div id="extTime-all">
    <h3 class="place">输入一句话：</h3>
    <div class="word row">
    	<input class="row-left" placeholder="我今早9点出的门，晚上才回来。"/>
    	<p class="row-right">提取</p>
    </div>
    <ol class="result">
    	<li class="first">提取结果：</li>
    	<li>2019-09-17,9:00</li>
    	<li>2019-09-17,20:00</li>
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
    load_data(){
    	this.request({
    		method:"POST",
    		url:"http://127.0.0.1:8000/index/",
    		dataType:'json',
    		data:{
    			"word":"今天8点去小树林。"
    		},
    		success:(res)=>{
    			console.log(res);
    		}
    	})
    }
  },
  created () {

  },
  mounted () {
     this.showNAV = false;
     this.load_data();
  }
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
  
  #extTime-all{
  	position: relative;
  	padding-left: 30%;
  	padding-top: 20%;
  	>.place{
  		position: relative;
  		font-size: 16px;
  		padding: 15px 0;
  	}
  	>.word{
  		width: 302px;

  		border: 1px solid @back2;
  		>.row-left{
  			width: 250px;
  			height: 30px;
  			font-size: 14px;
  			padding: 0 5px;
  		}
  		>.row-right{
  			width: 50px;
  			text-align-last: center;
  			font-size: 14px;
  			height: 30px;
  			line-height: 30px;
  			background:@back1;
  			color:white;
  			cursor: pointer;
  		}
  	}
  	>.result{
  		position: relative;
  		>li{
  			font-size: 14px;
  			margin: 5px 0;
  			position: relative;
  		}
  		>.first{
  			font-size: 16px;
  		}
  	}
  }
</style>
