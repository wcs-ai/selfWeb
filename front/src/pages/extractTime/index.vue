<template>
  <div id="newad-all">
    <p class="ph-nav" v-if="show_headBar==true"><i class="iconfont" @click="page_back()">&#xe606;</i>新建地址</p>
    <div class="row info">
      <p class="row-left p">收货人</p>
      <input placeholder="姓名" v-bind:style="{top:d.inp_top+'px'}" v-bind:value="d.name" @input="get_input($event,0)" class="inp row-left"/>
    </div>
    <div class="row info">
      <p class="row-left p">联系电话</p>
      <input placeholder="手机号码" maxlength="11" v-bind:style="{top:d.inp_top+'px'}" v-bind:value="d.phone" @input="get_input($event,1)" class="inp row-left"/>
    </div>
    <div class="row info" @click="bottom_hint(1)">
      <p class="row-left p">所在地区</p>
      <p class="inp row-left" v-bind:style="{ color:d.col }">{{ d.res[0].name }},{{ d.res[1].name }},{{ d.res[2].name }}</p>
      <i class="row-right iconfont">&#xe64e;</i>
    </div>
    <div class="row info">
      <p class="row-left p">详细地址</p>
      <input placeholder="填写街道、门牌号等" v-bind:style="{top:d.inp_top+'px'}" v-bind:value="d.d_area" @input="get_input($event,2)" class="inp row-left"/>
    </div>
    <div class="row tag">
      <p class="row-left txt">标签</p>
      <p class="row-left ad_mark" v-bind:class="{ in_:d.tag[0] }" @click="alter_tag(0)">家</p>
      <p class="row-left ad_mark" v-bind:class="{ in_:d.tag[1] }" @click="alter_tag(1)">公司</p>
      <p class="row-left ad_mark" v-bind:class="{ in_:d.tag[2] }" @click="alter_tag(2)">学校</p>
    </div>
    <div class="default row">
      <div class="row-left">
        <p class="p1">设置默认地址</p>
        <p class="p2">提醒：每次下单时会使用该地址</p>
      </div>
      <!--开关-->
      <div class="row-right" @click="switch_stat()">
        <div id="switch" v-bind:style="{ width:d.out_w+'px',height:d.out_h+'px' }">
          <div class="switch-back" v-bind:style="{ width:d.w+'px' }"></div>
          <p class="switch-button" v-bind:style="{ width:d.in_h+'px',height:d.in_h+'px',left:d.lef+'px' }"></p>
        </div>
      </div>

      <div id="save" @click="save()">保存</div>

      <!--黑色提示背景-->
      <div id="black-back" v-bind:style="{ display:d.hint.back }"></div>
      <!--底部显示的提示-->
      <div id="bottom-hint" v-bind:style="{ bottom:d.hint.b.btm }">
        <div class="title">配送至</div>
        <div id="sel_addr_plugin">
          <div class="sel_result">
            <p class="p" v-on:click="click_list(0)" v-bind:class="{ pin:d.res[0].sta }" v-bind:style="{ left:d.res[0].lef2+'px' }">{{ d.res[0].name }}</p>
            <p class="p" v-on:click="click_list(1)" v-bind:class="{ pin:d.res[1].sta }" v-bind:style="{ left:d.res[1].lef2+'px' }">{{ d.res[1].name }}</p>
            <p class="p" v-on:click="click_list(2)" v-bind:class="{ pin:d.res[2].sta }" v-bind:style="{ left:d.res[2].lef2+'px' }">{{ d.res[2].name }}</p>
          </div>
          <div class="sel_body">
            <div class="div d1" v-bind:style="{ left:d.res[0].lef+'px',opacity:d.res[0].opc }">
              <p class="p" v-for="(p1,p2) in d.pro" v-on:click="sel_addr(0,p2)" :key="p2" >{{ p1.name }} </p>
            </div>
            <div class="div d2" v-bind:style="{ left:d.res[1].lef+'px',opacity:d.res[1].opc }">
              <p class="p" v-for="(c1,c2) in d.city" v-on:click="sel_addr(1,c2)" :key="c2">{{ c1.name }}</p>
            </div>
            <div class="div d3" v-bind:style="{ left:d.res[2].lef+'px',opacity:d.res[2].opc }">
              <p class="p" v-for="(cou1,cou2) in d.county" v-on:click="sel_addr(2,cou2)" :key="cou2"> {{ cou1.name }}</p></div>
          </div>
        </div>
        <p class="icon" @click="bottom_hint(0)">
          <i class="ic1 i"></i>
          <i class="ic2 i"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  var d = {
    token:'',
    is_new:true,
    id_:null,
    name:'',
    phone:'',
    area:'选择省市区',
    d_area:'',
    tag:[true,false,false],
    tag_txt:'家',
    default:0,
    tran:'none',
    lef:'0',
    w:'0',
    out_w:'50',
    out_h:'22',
    in_h:'20',
    col:'#6e6e6e',
    inp_top:0,
    hint:{
      back:'none',
      s:{dpy:'none',opc:'0',con:'提示内容'},
      c:{dpy:'none',opc:'0.4',con:''},
      b:{dpy:'none',btm:'-100%',con:''}
    },
    addr:'',
    w2:0,
    res:[{
      name:'请选择',
      id:'',
      lef:0,
      lef2:0,
      opc:1,
      sta:true
    },{
      name:'请选择',
      id:'',
      lef:500,
      lef2:375,
      opc:0,
      sta:true
    },{
      name:'请选择',
      id:'',
      lef:500,
      lef2:375,
      opc:0,
      sta:true
    }],
    pro:[],
    city:[],
    county:[],
  };

export default {
  data () {
    return {
      d
    }
  },
  components: {

  },
  methods: {
    get_input(e,i){
      //获取各个输入框的输入
      var a = parseInt(i);

      if(a===0){
        // name
        d.name = e.target.value;
      }
      else if(a===1){
        d.phone = e.target.value;
      }
      else{
        d.d_area = e.target.value;
      }
    },
    init_data(){
      d.token = this.get_token();
      //判断是否新增操作
      var is_new = this.get_url_argments('new_op')=='true' ? true : false;
      d.is_new = is_new;
      d.inp_top = this.show_headBar===true ? 0 : -1;
      if(is_new===false){
        this.set_title('修改地址');
        d.id_ = parseInt(this.get_url_argments('aid'));
        this.get_addr();
      }
    },
    get_addr(){
      //若是编辑地址操作则获取地址信息
      var self = this;
      this.request({
        method: 'post',
        url:this.$url['address']['addDetailURL'],
        data:{
          'token':d.token,
          'id':d.id_
        },
        dataType:'json',
        success:function(res){
          var res_,add,mark;
          if(res.statusCode){
            res_ = res.data;
          }
          else{
            res_ = res;
          }
          if(res_.status==1){
            add = res_.data['address'].split(',');
            d.name = res_.data['consignee'];
            d.phone = res_.data['mobile'];
            d.area = add.splice(0,3);
            d.res[0]['name'] = d.area[0];
            d.res[0]['id'] = res_.data['province_id'];
            d.res[1]['name'] = d.area[1];
            d.res[1]['id'] = res_.data['city_id'];
            d.res[2]['name'] = d.area[2];
            d.res[2]['id'] = res_.data['area_id'];
            //由于后台返回的地址数据多了个逗号，需要取最后一位,否则会导致带的参数出现错误，最终导致保存报错
            console.log(add)
            d.d_area = add[add.length-1];
            d.default = res_.data['isdefault'];
            mark = res_.data['tag'];
            if(mark=='家'){
              d.tag = [true,false,false];
            }
            else if(mark=='公司'){
              d.tag = [false,true,false];
            }
            else{
              d.tag = [false,false,true];
            }
            self.init_switch_stat();
          }
          else{
            self.small_hint('error');
          }
        }
      });
    },
    alter_tag(i){
      // 改变标签
      var a = parseInt(i);
      if(a===0){
        d.tag_txt = '家';
      }
      else if(a===1){
        d.tag_txt = '公司';
      }
      else{
        d.tag_txt = '学校';
      }
      //单个值改变不生效。
      if(a==2){
        d.tag = [false,false,true];
      }
      else if(a==1){
        d.tag = [false,true,false];
      }
      else{
        d.tag = [true,false,false];
      }
    },
    init_switch_stat(){
      // 初始化按钮状态
      if(d.default===0){
        //非默认
        d.w = 0;
        d.lef = 0;
      }
      else{
        d.w = '50';
        d.lef = 28;
      }
      d.tran = 'all 0.3s linear';
    },
    switch_stat(){
      // 改变按钮状态
      if(d.default===1){
        //非默认
        d.w = 0;
        d.lef = 0;
        d.default = 0;
      }
      else{
        d.w = 50;
        d.lef = 28;
        d.default = 1;
      }
    },
    save(){
      var self = this;
      var url_ = d.is_new===true ? this.$url['address']['addAddressURL'] : this.$url['address']['compileAddressURL'];
      var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      //姓名
      if(d.name == ""){
        this.small_hint("姓名不能为空");
        return
      }
      if(/[@#\$%\^&\*]+/g.test(d.name)){
        this.small_hint('姓名中不能含特殊字符');
        return
      }
      //手机号码
      if(d.phone == ""){
        this.small_hint("手机号码不能为空");
        return
      }
      if(!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(d.phone))){
        this.small_hint('手机号码不正确');
        return
      }
      //请填写收货人地址
      if(d.res[0].id == ""||d.res[1].id == ""||d.res[2].id == ""||d.d_area == ""){
        this.small_hint('请填写收货人地址');
        return
      }
        console.log(d)
        var data  ={
            'token':d.token,
            'consignee':d.name,
            'mobile':d.phone,
            'province_id':d.res[0].id,
            'city_id':d.res[1].id,
            'area_id':d.res[2].id,
            'street_id':null,
            'address':d.d_area,
            'isdefault':d.default,
            'id':d.id_,
            'tag':d.tag_txt
        }
       this.request({
          method:'post',
          url:url_,
          data:data,
          dataType:'json',
          success:function(res){
            var res_;
            if(res.statusCode){res_ = res.data;}
            else{res_ = res;}
            if(res_.status==1){
              self.small_hint('保存成功',()=>{
                self.page_back();
              });
              // setTimeout(function(){
              //   self.page_back();
              // },800);
            }
            else{
              //显示保存失败的详细原因
              self.small_hint(res.msg);
            }
          }
        });
    },
    sel_addr:function(i,ord){
      //i：0,i:1,i:2;选择地区
      var a = parseInt(i);
      var b = parseInt(ord);
      if(a<2){
        for(var o=a+1;o<d.res.length;o++){
          d.res[o]['name'] = '请选择';
        }
      }
      if(a===0){
        d.city = d.pro[b]['city'];
        d.res[a]['name'] = d.pro[b]['name'];
        d.res[a]['id'] = d.pro[b]['id'];

        for(var t=0;t<d.res.length;t++){
          d.res[t]['lef2'] = t<2 ? 0 : d.w2;
          d.res[t]['lef'] = t==a+1 ? 0 : d.w2;
          d.res[t]['opc'] = t==a+1  ? 1 : 0;
          d.res[t]['sta'] = t==a+1  ? true : false;
        }

      }
      else if(a===1){
        d.county = d.city[b]['district'];
        d.res[a]['name'] = d.city[b]['name'];
        d.res[a]['id'] = d.city[b]['id'];
        for(var t=0;t<d.res.length;t++){
          d.res[t]['lef2'] = 0;
          d.res[t]['lef'] = t==a+1 ? 0 : d.w2;
          d.res[t]['opc'] = t==a+1 ? 1 : 0;
          d.res[t]['sta'] = t==a+1  ? true : false;
        }
      }
      else{
        d.res[a]['name'] = d.county[b]['name'];
        d.res[a]['id'] = d.county[b]['id'];
      }
    },
    click_list:function(i){
      //点击省、市、县
      var a = parseInt(i);
      for(var c=0;c<d.res.length;c++){
        d.res[c]['sta'] = a===c ? true : false;
      }
      d.res[a]['opc'] = 1;
      d.res[a]['lef'] = 0;
      if(a===0){
        d.res[a+1]['lef'] = d.w2;
        d.res[a+2]['lef'] = d.w2;
        d.res[a+1]['opc'] = 0;
        d.res[a+2]['opc'] = 0;
      }
      if(a===1){
        d.res[a+1]['lef'] = d.w2;
        d.res[a+1]['opc'] = 0;
      }
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
        d.hint.back = 'block';
        //d.hint.b.dpy = 'block';
        d.hint.b.btm = '0';
      }
    }
  },
  created () {

  },
  mounted () {
      // console.log(99966666, this.$route, this.$root.$mp)
      d.pro = this.$addr[0]['province'];
      d.w2 = this.getWindowSize()[0];
      this.init_data();
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
  @size:20rem;
  #newad-all{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #efefef;
    >.info{
      padding: 12/@size 10/@size;
      background: white;
      >.p{
        font-size: 14px;
        width: 72/@size;
      }
      >.inp{
        font-size: 14px;
        width: 65%;
        margin-top: 0;
        outline: none;
        border: none;
      }
      >.iconfont{
        font-size: 16px;
        font-weight: 500;
      }
    }
    >.tag{
      margin: 5/@size 0;
      background: white;
      padding: 13/@size 10/@size;
      >.txt{
        font-size: 14px;
        width: 72/@size;
        text-align: left;
      }
      >.ad_mark{
        width: 50/@size;
        background: @f_dgray;
        color: @f_back;
        text-align: center;
        margin-right: 25/@size;
        padding: 2/@size 0;
        font-size: 14px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
      }
      >.in_{
        background: @f_green;
        color: white;
      }
    }
    >.default{
      padding: 13/@size 10/@size;
      background: white;
      >.row-left{
        >.p1{
          font-size: 14px;
          color: black;
        }
        >.p2{
          font-size: 12px;
          color: @f_gray;
          padding: 4/@size 0;
        }
      }
      >.row-right{
        padding: 8/@size 0;
        #switch{
          position: relative;
          /*width: 50px;*/
          height: 22px;
          padding: 1px;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
          overflow: hidden;
          background: @f_dgray;
          >.switch-back{
            position: absolute;
            background: @f_red;
            height: 100%;
            left: 0;
            top: 0;
            -webkit-transition: width 0.3s linear;
            -moz-transition: width 0.3s linear;
            -ms-transition: width 0.3s linear;
            -o-transition: width 0.3s linear;
            transition: width 0.3s linear;
            z-index: 20;
          }
          >.switch-button{
            position: relative;
            /*width: 20px;*/
            /*height: 20px;*/
            background: white;
            top: 0;
            z-index: 350;
            -webkit-transition: all 0.3s linear;
            -moz-transition: all 0.3s linear;
            -ms-transition: all 0.3s linear;
            -o-transition: all 0.3s linear;
            transition: all 0.3s linear;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
      }
    }
    #save{
      position: relative;
      width: 89.33%;
      margin: 140/@size auto;
      text-align: center;
      padding: 10/@size 0;
      color: white;
      font-size: 16px;
      font-weight: 600;
      background: linear-gradient(left,#5bebc8,#21d2a8);
      background: -webkit-linear-gradient(left,#5bebc8,#21d2a8);
      background: -o-linear-gradient(left,#5bebc8,#21d2a8);
      background: -moz-linear-gradient(left,#5bebc8,#21d2a8);
      background: -ms-linear-gradient(left,#5bebc8,#21d2a8);
      border-radius: 25px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      -ms-border-radius: 25px;
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
    border-top-left-radius:10px;
    -webkit-border-top-left-radius: 10px;
    -ms-border-top-left-radius:10px;
    -moz-border-top-left-radius:10px;
    border-top-right-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    >.title{
      position: relative;
      font-size: 16px;
      text-align: center;
      padding: 15/@size 0;
    }
    >.icon{
      position: absolute;
      width: 15/@size;
      height: 15/@size;
      top: 10/@size;
      right: 10/@size;
      padding: 0;
      z-index: 360;
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
        transform: rotate(45deg);
      }
      >.ic2{
        right: 0;
        transform: rotate(-45deg);
      }
    }
  }
  /*地址选择器部分*/
  #sel_addr_plugin{
    position: relative;
    width: 100%;
    overflow-x: hidden;
    padding: 0 10/@size;
    >.sel_result{
      position: relative;
      width: 100%;
      overflow: hidden;
      padding-bottom: 4/@size;
      >.p{
        position:relative;
        float: left;
        left: 0;
        font-size: 14px;
        padding: 4/@size 0;
        margin-right: 24/@size;
        transition: all 0.3s linear;
        border-bottom: 2px solid white;
      }
      >.pin{
        color: @f_green;
        border-bottom: 2px solid @f_green;
      }
    }
    >.sel_body{
      position: relative;
      width: 100%;
      height: 320/@size;
      overflow-x: hidden;
      >.div{
        position:absolute;
        width: 100%;
        height: 312/@size;
        overflow-y: scroll;
        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;
        background: white;
        >.p{
          position: relative;
          padding: 10/@size 0;
          font-size: 14px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
      }
      >.d1{
        z-index: 100;
      }
      >.d2{
        z-index: 200;
      }
      >.d3{
        z-index: 300;
      }
    }
  }
  .sel_result:after{content: "";display: block;clear: both;}

  .to_right{
    left: 100%;
  }

</style>
