<template>
  <div id="extTime-all">
    <h3 class="place">输入一句话：</h3>
    <div class="word row">
    	<input class="row-left" v-model="sentence"/>
    	<p class="row-right" @click="load_data()">提取</p>
    </div>
    <ol class="result">
    	<li class="first">提取结果：</li>
    	<li v-for="(itm,idx) in ts" :key="idx">{{ itm }}</li>
    </ol>
  </div>
</template>

<script>

export default {
  data () {
    return {
      sentence:'昨天18点订的房间。',
      ts:[]
    }
  },
  components: {

  },
  methods: {
    load_data(){
    	this.request({
    		method:"POST",
    		url:"/AiApi/etcTime/",
    		dataType:'json',
    		data:{
    			"sentence":this.sentence
    		},
    		success:(res)=>{
    			if(res.status==='ok'){
    			  this.ts = res.data['times'];

          }
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

  @media only screen and (min-width: 300px) and (max-width: 999px){
    #extTime-all{
      padding: 20/@size 10/@size;
      >.place{
        position: relative;
        font-size: 16/@size;
        padding: 15/@size 0;
      }
      >.word{
        width: 100%;
        >.row-left{
          width: 80%;
          height: 30px;
          font-size: 14px;
          padding: 0 5px;
        }
        >.row-right{
          width: 20%;
          font-size: 14/@size;
          height: 30/@size;
          line-height: 30/@size;
          cursor: pointer;
        }
      }
      >.result{
        position: relative;
        >li{
          font-size: 14/@size;
          margin: 5/@size 0;
        }
        >.first{
          font-size: 16/@size;
        }
      }
    }
  }
</style>
