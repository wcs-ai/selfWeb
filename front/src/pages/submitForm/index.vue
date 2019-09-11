<template>
  <div id="sub-all">
    <p class="ph-nav" v-if="show_headBar==true"><i class="iconfont" @click="page_back()">&#xe606;</i>确认订单</p>
    <div class="address" @click="to_addr()">
      <div class="row div1">
        <p class="iconfont row-left">&#xe601;</p>
        <div class="row-left row">
          <p class="row-left">收货人：{{ d.addr.consignee }}</p>
          <p class="row-right">{{ d.addr.mobile }}</p>
        </div>
      </div>
      <div class="row div2">
        <p class="iconfont row-left">&#xe694;</p>
        <p class="row-right">收货地址：{{ d.addr.address }}</p>
      </div>
      <p class="iconfont">&#xe64e;</p>
    </div>
    <img class="linea" mode="widthFix" src="../../../static/img1/linea.png"/>
    <!--商品-->
    <div class="store-item" v-for="(st1,st2) in d.stores" :key="st2">
      <div class="stitle row">
        <i class="iconfont row-left">&#xe60d;</i><p class="row-left p">{{ st1.sell_name }}</p>
      </div>
      <div class="row gds" v-for="(g1,g2) in st1.goods_info" :key="g2">
        <p class="p row-left">
          <img class="img" mode="widthFix" v-bind:src="g1.thumb"/>
        </p>
        <div class="info row-right">
          <p class="price"><i class="i">￥</i><b class="b">{{ g1.sell_price }}</b><em class="em">x{{ g1.goods_num }}</em></p>
          <p class="name">{{ g1.name }}</p>
          <p class="p1">{{ g1.specifications }}</p>
        </div>
        <p id="fenge"></p>
        <p class="p1 row">配送方式：<i class="i">{{ st1.express_info.name }}</i><em class="row-right">￥{{ st1.express_info.fee }}</em></p>
      </div>
      <p class="p2">共{{ st1.sum_num }}件商品<i class="i1">小计：</i><i class="i2">￥{{ st1.sum_money }}</i></p>
    </div>
    <!--v-bind:style="{top:d.inp_top+'px'}"-->
    <div class="user-message row"><i class="row-left">备注：</i><input class="inp row-left" v-bind:style="{top:d.inp_top+'px'}" v-model="d.message" placeholder="选填,请先和客服协商一致"/></div>
    <!--优惠减免、积分-->
    <div class="profit">
      <div class="pro-item row">
        <p class="row-left">优惠券：<i class="i">{{ d.coup_one.title }}</i></p>
        <p class="row-right" @click="bottom_hint(1)">-￥{{ d.coup_one.price }}<i class="iconfont">&#xe64e;</i></p>
      </div>
      <div class="pro-item row" v-if="d.show_redPack==true">
        <p class="row-left">红包：<i class="i">新人</i></p>
        <p class="row-right">-￥10<i class="iconfont">&#xe64e;</i></p>
      </div>
      <div class="pro-item row" v-if="d.activity==true">
        <p class="row-left">活动：<i class="i">{{ d.act_one.title }}</i></p>
        <p class="row-right">-￥{{ d.act_one.discount_amount }}<i class="iconfont">&#xe64e;</i></p>
      </div>
      <div class="pro-item row" v-if="d.show_integral==true">
        <p class="row-left">积分：<i class="i"></i></p>
        <p class="row-right">{{ d.integral }}分</p>
      </div>
    </div>
    <div class="result">
      <div class="row"><p class="row-left">商品金额:</p><p class="row-right">￥{{ d.pre_money }}</p></div>
      <div class="row"><p class="row-left">运费:</p><p class="row-right">￥{{ d.path_money }}</p></div>
      <div class="row"><p class="row-left">优惠减免:</p><p class="row-right">￥{{ d.profit_money }}</p></div>
      <div class="row"><p class="row-left">总金额:</p><p class="row-right">￥{{ d.after_money }}</p></div>
    </div>

    <div id="bt" class="row">
      <div class="row-left">合计：<i class="i">￥{{ d.after_money }}</i></div>
      <div class="row-right" @click="sure_form()">提交订单</div>
    </div>
    <!--黑色提示背景-->
    <div id="black-back" v-bind:style="{ display:d.hint.back }"></div>
    <!--单标签提示-->
    <div id="small-hint" v-bind:style="{ display:d.hint.s.dpy,opacity:d.hint.s.opc }">
      <em class="em">{{ d.hint.s.con }}</em>
    </div>
    <!--底部显示的提示-->
    <div id="bottom-hint" v-bind:style="{ display:d.hint.b.dpy,bottom:d.hint.b.btm }">
      <p class="title">使用优惠券</p>
      <div class="row" v-for="(c1,c2) in d.coupn" @click="sel_coupn(c2)" :key="c2">
        <p class="row-left">{{ c1.name }}</p>
        <p class="row-right iconfont" v-bind:class="{ in_:c1.sta }">&#xe713;</p>
      </div>
      <div id="complate" @click="bottom_hint(0)">完成</div>
      <p class="icon" @click="bottom_hint(0)">
        <i class="ic1 i"></i>
        <i class="ic2 i"></i>
      </p>
    </div>
  </div>
</template>

<script>
  var d = {
    token:'',
    inp_top:0,
    addr:{
      id:null,
      consignee:'暂无',
      mobile:'',
      address:'暂无'
    },
    stores:[],
    act_id:null,
    cop_id:null,
    add_id:null,
    redpay_id:null,
    message:'',
    //优惠券,活动
    show_redPack:false,
    show_activity:false,
    show_integral:false,
    coupn:[],
    activity:[],
    integral:0,
    pre_money:0,
    after_money:0,
    profit_money:0,
    path_money:0,
    act_one:{
      title:'暂无',
      discount_amount:0.00,
      id:null
    },
    coup_one:{
      title:'暂无',
      price:0.00,
      id:null
    },
    hint:{
      back:'none',
      s:{dpy:'none',opc:'0',con:'提示内容'},
      c:{dpy:'none',opc:'0.4',con:''},
      b:{dpy:'block',btm:'-100%',con:''}
    }
  };
  function small_hint(info){
    // 单标签提示
    d.hint.s.con = info;
    d.hint.s.dpy = "block";
    d.hint.s.opc = "1";
    setTimeout(function(){
      d.hint.s.opc = "0";
    },1000);
    setTimeout(function(){
      d.hint.s.dpy = "block";
    },1300);
  }
export default {
  data () {
    return {
      d
    }
  },
  components: {

  },
  methods: {
    init_data(){
      d.token = this.get_token();
      d.inp_top = this.show_headBar===true ? 0 : -1;
      d.cop_id = parseInt(this.get_url_argments('cpid')) || '';
      d.add_id = parseInt(this.get_url_argments('adid')) || '';
      d.act_id = parseInt(this.get_url_argments('actid')) || '';
      this.load_data();
    },
    to_addr(){
      this.to_page('../pages/manage_addr/main?token='+ d.token +'&back=true');
    },
    load_data(){
      //加载订单信息
      var self = this;
      this.request({
        method:'post',
        url:this.$url['subForm']['getFormDetailURL'],
        data:{
          'token':d.token,
          'activity_id':d.act_id,
          'coupon_id':d.cop_id,
          'integral':0,
          'red_packet_id':0,
          'address_id':d.add_id
        },
        dataType:'json',
        success:function(res){
          var num,money;
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          console.log(res_);
          if (res_.status == 1) {
            d.show_redPack = res_.data['red_packet'].length>0 ? true : false;
            d.show_activity = res_.data['activity'].length>0 ? true : false;
            d.show_integral = res_.data['integral_amount']>0 ? true :false;

            d.addr = res_.data['address']==null||res_.data['address']=='null' ? d.addr : res_.data['address'];
            d.stores = res_.data['list'];
            d.coupn = res_.data['coupon'];
            d.activity = res_.data['activity'];
            d.pre_money = res_.data['goods_amount'];
            d.after_money = res_.data['real_amount'];
            d.integral = res_.data['integral_amount'];
            d.path_money = res_.data['delivery_amount'];
            d.profit_money = res_.data['discount_amount'];

            for(var n=0;n<d.coupn.length;n++){
              d.coupn[n]['sta'] = n===0 ? true : false;
            }
            if(d.coupn.length>=1){
              d.coup_one = d.coupn[0];
            }
            if(d.activity.length>=1){
              d.act_one = d.activity[0];
            }
            for(var c=0;c<d.stores.length;c++){
              num = 0;
              money = 0;
              if(d.stores[c]['express_info']==null||d.stores[c]['express_info']=='null'){
                d.stores[c]['express_info'] = {
                  name:'暂无',
                  fee:'0.00'
                }
              }
              for(var g=0;g<d.stores[c]['goods_info'].length;g++){
                num += parseInt(d.stores[c]['goods_info'][g]['goods_num']);
                money += Number(d.stores[c]['goods_info'][g]['sell_price'])*Number(d.stores[c]['goods_info'][g]['goods_num']);
              }
              d.stores[c]['sum_num'] = num;
              d.stores[c]['sum_money'] = money.toFixed(2);
            }
          } else {
            self.page_back();
          }
        }
      });
    },
    sure_form(){
      //确认订单
      var self = this;
      if(!d.addr['id']||d.addr==null||d.addr=='null'){
        small_hint('请选择收货地址');
        return;
      }
      this.request({
        method:'post',
        url:this.$url['subForm']['toPayURL'],
        data:{
          'source':1,
          'pay_type':1,
          'token':d.token,
          'message':d.message,
          'address_id':d.addr.id,
          'delivery_amount':d.path_money,
          'promot_amount':0,
          'commission_id':"",
          'activity_id':d.act_one.id,
          'integral':d.integral,
          'coupon_id':d.coup_one.id,
          'red_packet_id':''
        },
        dataType:'json',
        success:function(res){
          var res_;
          if(res.statusCode){
            res_ = res.data;
          }
          else{
            res_ = res;
          }

          if(res_.status==1){
            if(d.after_money>0){
              self.to_page('../pages/pay/main?token='+d.token+'&fid='+res_.data['order_id']);
            }
            else{
              self.to_page('../pages/goodsForm/main?token='+d.token+'&sta=0');
            }
          }
          else{
            small_hint(res_.msg);
          }
        }
      });
    },
    sel_coupn(i){
      //点击选择优惠券
      var a = parseInt(i);
      d.coup_one = d.coupn[a];
    },
    complete(){
      //优惠券点击完成
      this.load_data();
    },
    bottom_hint:function(i){
      if(i===0){
        d.hint.b.btm = "-100%";
        setTimeout(function(){
          d.hint.back = 'none';
          //d.hint.b.dpy = 'none';
        },300);
      }
      else{
        d.hint.b.dpy = 'block';
        d.hint.back = 'block';
        d.hint.b.btm = '0';
      }
    }
  },
  created () {

  },
  onLoad(){
    if(this.show_headBar===false){
      this.init_data();
    }
  },
  mounted () {
    if(this.show_headBar===true){
      this.init_data();
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
  @size:18.75rem;
  #sub-all{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    padding-bottom: 50px;
    background: @bg_color;
    >.user-message{
      position: relative;
      background: white;
      padding: 12/@size 10/@size;
      font-size: 14/@size;
      color: @f_back;
      margin-bottom: 5/@size;
      >.inp{
        position: relative;
        display: inline-block;
        height: 20px;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        font-size: 14/@size;
        width: 80%;
      }
    }
  }
  .address{
    position: relative;
    background: white;
    width: 100%;
    padding: 0 1.5rem 1rem 0.5rem;
    >.div1{
      padding: 24/@size 0;
      >.iconfont{
        font-size: 16/@size;
        color: @f_green;
        width: 4.4%;
      }
      >.row{
        width: 95%;
        padding-left: 7/@size;
        >.row-left{
          font-size: 14/@size;
        }
        >.row-right{
          padding-left: 5/@size;
          font-size: 14/@size;
        }
      }
    }
    >.div2{
      >.iconfont{
        font-size: 16/@size;
        color: @f_green;
        width: 4.4%;
      }
      >.row-right{
        width: 95%;
        padding-left: 5/@size;
        font-size: 14/@size;
        text-align: left;
      }
    }
    >.iconfont{
      display: block;
      position: absolute;
      font-size: 16px;
      z-index: 350;
      top: 45/@size;
      right: 10/@size;
    }
  }
  /*接*/

  #sub-all>.linea{
    display: block;
    position: relative;
    width: 100%;
    max-height: 4/@size;
  }
  .store-item{
    position: relative;
    width: 100%;
    background: white;
    margin: 0.25rem 0;
    >.stitle{
      padding: 0.25rem 0.5rem;
      >.iconfont{
        font-size: 18/@size;
        margin-right: 3px;
      }
      >.p{
        font-size:14/@size;
      }
    }
    >.gds{
      padding: 10/@size 0.5rem;
      >.row-left{
        width: 24.6%;
        height: 90/@size;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        overflow: hidden;
        >.img{
          position: relative;
          width: 100%;
        }
      }
      >.info{
        width: 75%;
        padding-left: 0.2rem;
        height: 90/@size;
        >.price{
          white-space: nowrap;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }
        >.name{
          white-space: nowrap;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }
      }
      >.p1{
        padding: 0.75rem 0.5rem;
        font-size: 14/@size;
        >.i{
          font-size: 14/@size;
          color: @f_dgray;
          display: inline;
        }
        >.em{
          font-size: 14/@size;
        }
      }
    }
    >.p2{
      padding: 0.5rem;
      text-align: right;
      font-size: 14/@size;
      >.i1{
        display: inline;
        font-size: 14/@size;
        margin-left: 0.5rem;
      }
      >.i2{
        display: inline;
        font-size: 14/@size;
        color: @f_red;
      }
    }
  }

  .price>.i{
    position: relative;
    color: red;
    display: inline;
    font-size: 14/@size;
  }
  .price>.b{
    font-size: 18/@size;
    color: red;
    display: inline;
    color: red;
  }
  .price>.em{
    font-size: 14/@size;
    color: gray;
    display: inline;
  }
  .info>.name{font-size: 16/@size;padding: 0.25rem 0;}
  .info>.p1{
    position: absolute;
    width: 100%;
    padding-left: 0.2rem;
    font-size: 14/@size;
    color: gray;
    left: 0;
    bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  #fenge{
    position: relative;
    width: 100%;
    clear: both;
  }

  .profit{
    background: white;
    position: relative;
    margin-bottom: 0.5rem;
  }
  .profit>.row{
    padding: 0.35rem 0.5rem;
    >.row-right{
      font-size: 14/@size;
      >.iconfont{
        font-size: 14/@size;
        display: inline;
        margin-left: 2px;
      }
    }
  }
  .profit>.row>.row-left{
    font-size: 14/@size;
    >.i{
      font-size: 14/@size;
      color: gray;
      display: inline;
    }
  }
  .result{
    position: relative;
    width: 100%;
    background: white;
    >.row{
      padding: 0.4rem 0.5rem;
      >.row-left{
        font-size: 14px;
      }
      >.row-right{
        padding-right: 0.6rem;
        font-size: 14/@size;
      }
    }
  }
  #bt{
    position: fixed;
    width: 100%;
    border-top: 1px solid @f_dgray;
    background: white;
    left: 0;
    bottom: 0;
    padding: 5/@size 10/@size;
    >.row-left{
      font-size: 14/@size;
      padding-top: 8/@size;
      >.i{
        display: inline;
        font-size: 14/@size;
        color: @f_red;
      }
    }
    >.row-right{
      font-size: 16/@size;
      text-align: center;
      color: white;
      background: @f_red;
      padding: 6/@size 0;
      width: 100/@size;
      border-radius: 25/@size;
      -webkit-border-radius: 25/@size;
      -moz-border-radius: 25/@size;
      -ms-border-radius: 25/@size;
    }
  }
  /*底部弹出的提示*/
  #bottom-hint{
    position: fixed;
    width: 100%;
    left: 0;
    background: white;
    z-index: 1600;
    bottom: -100%;
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    -ms-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    transition: all 0.3s linear;
    padding-bottom:1px;
    >.title{
      position: relative;
      font-size: 16/@size;
      text-align: center;
      padding: 15/@size;
    }
    >.row{
      padding: 15/@size 10/@size;
      width: 100%;
      >.row-left{
        font-size: 14px;
      }
      >.row-right{
        width: 15/@size;
        height: 15/@size;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        border: 1px solid @f_dgray;
        line-height: 15/@size;
        color: white;
        background: white;
        font-size: 12/@size;
        text-align: center;
      }
      >.in_{
        background: @f_red;
      }
    }
    .icon{
      position: absolute;
      width: 15/@size;
      height: 15/@size;
      right: 10/@size;
      top: 10/@size;
      padding: 0;
      z-index: 170;
      >.i{
        display: block;
        position: absolute;
        width: 100%;
        height: 2px;
        top: 50%;
        margin-top: -1px;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        -ms-border-radius: 2px;
        background: black;
      }
      >.ic1{
        left: 0;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        transform: rotate(45deg);
      }
      >.ic2{
        right: 0;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
  }
  #complate{
    position: relative;
    width: 89.33%;
    text-align: center;
    color: white;
    font-size: 16/@size;
    padding: 7/@size;
    margin: 15/@size auto;
    border-radius: 25/@size;
    -webkit-border-radius: 25/@size;
    -moz-border-radius: 25/@size;
    -ms-border-radius: 25/@size;
    background: linear-gradient(left,#5bebc8,#21d2a8);
    background: -webkit-linear-gradient(left,#5bebc8,#21d2a8);
    background: -o-linear-gradient(left,#5bebc8,#21d2a8);
    background: -moz-linear-gradient(left,#5bebc8,#21d2a8);
    background: -ms-linear-gradient(left,#5bebc8,#21d2a8);
  }
</style>
