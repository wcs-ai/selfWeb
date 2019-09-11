<template>
  <div id="pdetail-all">
<!--    <div class="ph-nav row">-->
<!--      <i class="iconfont" @click="backTo()">&#xe606;</i>-->
<!--      商品详情-->
<!--      <p class="p2">-->
<!--        <i class="iconfont">&#xe648;</i>-->
<!--        <b class="info">1</b>-->
<!--      </p>-->
<!--    </div>-->
    <!--打开app提示-->
    <div id="head-hint" class="row" v-bind:style="{ height:d.page_h+'px' }">
      <div class="row-left xx" @click.stop="close_hint()">
        <p class="icon">
          <i class="ic1 i"></i>
          <i class="ic2 i"></i>
        </p>
      </div>
      <a class="row-left row" v-bind:href="d.openApp_protocol" @click="open_App()">
        <img class="img row-left" v-bind:src="image.logo"/>
        <i class="i row-left"><b class="b1">赶马商城APP</b><b class="b2">健康好运积分换礼等你领。</b></i>
      </a>
      <a class="row-right" v-bind:href="d.openApp_protocol" @click="open_App()">立即下载</a>
    </div>
    <!--商品详情-->
    <div class="ph-nav" v-if="show_headBar==true">
      <i class="iconfont" @click="page_back()">&#xe606;</i>
      商品详情<i class="iconfont cart" @click="to_cart()">&#xe618;<em class="num-mark" v-if="cart_num>0">{{ cart_num }}</em></i>
      <p class="info" @click="to_page('../pages/INFO/main')"><i class="iconfont">&#xe648;<em class="num-mark" v-if="info_num>0">{{ info_num }}</em></i></p>
    </div>
    <div class="el-move">
      <!--head-->
      <div id="head">
        <div id="head-h2" class="row">
          <p class="p el-w-3" @click="click_list(0)"><i class="i" v-bind:class="{ i_in:d.list_sta[0] }">商品</i></p>
          <p class="p el-w-3" @click="click_list(1)"><i class="i" v-bind:class="{ i_in:d.list_sta[1] }">评价</i></p>
          <p class="p el-w-3" @click="click_list(2)"><i class="i" v-bind:class="{ i_in:d.list_sta[2] }">详情</i></p>
          <p id="linea" v-bind:style="{ left:d.linea.move+'px',width:d.linea.w+'px' }"></p>
        </div>
      </div>
      <!--v-on:touchstart="m_elStart($event)" v-on:touchmove="m_elMove($event)" v-on:touchend="m_elEnd($event)" -->
      <div class="move-content" v-bind:style="{ left:d.move_el.movex + 'px',transition:d.move_el.tran }">
        <!--第一页-->
        <div class="li" id="goods-host">
              <!--轮播图部分-->
          <div id="host-in">
              <div class="my_rotate">
                <div class="contain_img" v-on:touchstart.stop="elStart($event)" v-on:touchmove.stop="elMove($event)" v-on:touchend.stop="elEnd($event)" v-bind:style="{ left:d.el_.movex + 'px',width:d.el_.out_w + 'px',transition:d.el_.tran }">
                  <img class="img" v-bind:src="d.last_img" mode="widthFix" v-bind:style="{ width:d.el_.w + 'px' }"/>
                  <img class="img" mode="widthFix" v-for="(ig,ind) in d.banners" :key="ind" v-bind:src="ig" v-bind:style="{ width:d.el_.w + 'px' }"/>
                  <img class="img" v-bind:src="d.first_img" mode="widthFix" v-bind:style="{ width:d.el_.w + 'px' }"/>
                </div>
                <p class="points">{{ d.el_.ord-1 }}/{{ d.el_.num }}</p>
              </div>
            <!--拼团特价日显示-->
              <div class="knock" v-if="d.show_knock==true||d.is_promotion==true">
                <div class="row-left" v-bind:style="{ background:d.price_back_color }">
                  <p class="p1">
                    <i class="i">￥</i><b class="b">{{ d.price_sell }}</b>
                    <em class="em">原价:￥{{ d.price_org }}</em>
                  </p>
                  <p class="p2" v-if="d.show_knock==true">累计：{{ d.join_num }}人已拼团</p>
<!--                  <p class="p2" v-show="d.is_promotion==true">累计：{{ d.promotion_number }}件已售</p>-->
                </div>
                <div class="row-right">
                  <p class="p1 row">
                    <img class="img row-left" mode="widthFix" src="../../../static/img/activity_clock.png"/>
                    <i class="row-left i">{{ d.activity_word }}</i>
                  </p>
                  <p class="p2 row">
                    <i class="i row-left">{{ d.t1 }}</i><i class="row-left i1">:</i>
                    <i class="i row-left">{{ d.t2 }}</i><i class="row-left i1">:</i>
                    <i class="i row-left">{{ d.t3 }}</i>
                  </p>
                </div>
              </div>
              <!--商品信息部分-->
              <div class="row" id="price" v-if="d.isIntegral==false&&d.show_knock==false&&d.is_promotion==false">
                <div class="row-left">
                  <p class="p1">
                    <i class="i">￥</i><b class="b">{{ d.price_sell }}</b>
                    <em class="em">原价:￥{{ d.price_org }}</em>
                  </p>
<!--            <p class="p2">月销：{{ d.sel_num }}</p>-->
                </div>
                <div class="row-right"><i class="iconfont">&#xe60d;</i><em class="em">{{ d.store }}</em></div>
              </div>
            <!--积分商城时显示-->
              <p class="p-integral" v-if="d.isIntegral==true">{{ d.integral }}分</p>
              <div class="row" id="discript">
                <p class="row-left">{{ d.name }}</p>
                <p class="row-right" @click="open_plate(1)"><i class="iconfont">&#xe610;</i>分享</p>
              </div>
              <!--优惠信息-->
              <div class="profit row" v-if="d.isIntegral==false" @click="open_plate(2)">
                <div class="em row-left row"><p class="row-left">优惠券：</p><p class="i row-left">{{ d.prof_one.name }}</p></div>
                <p class="row-right">去领券 <i class="iconfont">&#xe64e;</i></p>
              </div>
              <div class="explain row" @click="open_plate(3)">
                <em class="em row-left">说明：</em>
                <p class="row-left p" v-for="(ser,ind) in d.two_serve" :key="ind"><i class="iconfont">&#xe713;</i>{{ ser.type }}</p>
<!--                <p class="row-left p"><i class="iconfont">&#xe713;</i>不支持退换货</p>-->
                <p class="row-right"><i class="iconfont">&#xe64e;</i></p>
              </div>

              <div class="sel row" @click="sel_combo()" v-if="d.isIntegral==false">
                <em class="row-left">已选：{{ d.here_name }}</em>
                <i class="iconfont row-right">&#xe64e;</i>
              </div>
              <div class="address" @click="to_addr()">
                <div class="d2 row"><p class="row-left">送至：{{ d.address.address }}</p><i class="row-right iconfont">&#xe64e;</i></div>
                <div class="d1">运费：{{ d.express }}</div>
              </div>
            <!--组队拼团部分呀-->
              <div class="knock-plate" v-if="d.show_knock==true">
                <div class="row">
                  <p class="row-left">{{ d.comment_num }}人正在拼单，可直接参与</p>
                  <p class="row-right" @click="all_knock()">查看全部<i class="iconfont">&#xe64e;</i></p>
                </div>
                <div class="user-list">
                  <div class="row" v-for="(user,uin) in d.knock_user" :key="uin">
                    <p class="p1 row-left">
                      <img class="img" mode="widthFix" v-bind:src="user.avatar"/>
                    </p>
                    <p class="p2 row-left">{{ user.name }}</p>
                    <p class="p3 row-right" @click="to_knockt(uin)">去拼单</p>
                    <p class="p4 row-right"><i class="i1 i">还差{{ d.limit_people-user.owe_num }}人拼成</i><i class="i2 i">剩余{{ user.rt }}</i></p>
                  </div>
                </div>
              </div>
              <!--评价部分-->
              <div class="gds_comment" id="gds_comment">
                <div class="row">
                  <p class="row-left">商品评价({{ d.comment_num }})</p>
                  <p class="row-right" v-bind:class="{in_:d.cm_status}" @click="look_comment()">查看全部<i class="iconfont">&#xe64e;</i></p>
                </div>
                <div class="comment_item" v-for="(cm1,cm2) in d.cms" :key="cm2">
                  <div class="com_head row">
                    <p class="p row-left"><img class="img" mode="widthFix" v-bind:src="image.self_head"/></p>
                    <i class="i row-left">{{ cm1.name }}</i>
                    <em class="em row-left" v-for="(tag,ind) in cm1.tag" :key="ind">{{ tag }}</em>
                  </div>
                  <div class="cm_text">{{ cm1.contents }}</div>
                  <div class="row cm_img">
                    <p class="p" v-for="(ig,ind) in cm1.imgs" :key="ind"><img class="img" mode="widthFix" v-bind:src="ig"/></p>
                  </div>
                </div>
              </div>
            <!--推荐商品-->
            <div class="commend_goods">
              <p class="title">为您推荐</p>
              <!--v-on:touchstart.stop="wx_move()" v-on:touchend.stop="wx_move()"-->
              <div class="list_out">
                <div class="goods_list" v-bind:style="{ position:'relative',width:d.recommend_width+'px','white-space':'nowrap' }">
                  <div class="row" style="position: relative;width: 100%;white-space: nowrap" v-on:scroll="wx_move($event)" scroll-x="true">
                    <div class="row-left" v-for="(item,index) in d.recommend" @click="to_detail(index)" style="position:relative;float:left;width: 5.3rem; margin-left:0.53rem;">
                      <p class="p1" style="position: relative;width: 100%;height: 5.3rem;overflow: hidden;-webkit-border-radius:0.26rem;-moz-border-radius:0.26rem;border-radius:0.26rem;">
                        <img class="img" mode="widthFix" v-bind:src="item.thumb" style="position: relative;width: 100%;"/>
                      </p>
                      <p class="p2" style="position: relative;width: 100%;height: 2rem;overflow: hidden;font-size:0.74rem;margin:0.32rem 0;">{{ item.name }}</p>
                      <p class="p3" style="font-size:0.74rem;color:#ff2e5a;">￥{{ item.sell_price }}</p>
                    </div>
                    <p id="fen-linea" style="position: relative;width: 100%;clear: both;"></p>
                  </div>
                </div>
              </div>

            </div>
            <!--第一页详情部分-->
              <div class="gds_detail" id="gds_detail">
                <p class="title">商品详情</p>
                <img class="img" mode="widthFix" v-for="im in d.detail_con" v-bind:src="im" :key="im"/>
              </div>
              <p class="bt-img"><img class="img" mode="widthFix" src="../../../static/img/bottom_empty.png"/></p>
          </div>
          <!--底部-->
          <div id="foot" class="row" v-bind:style="{ bottom:d.page_h+d.title_h+'px' }">
            <div class="a" @click="click_collect()"><b class="iconfont" v-bind:class="{ in_:d.is_collect }">&#xe614;</b><span class="span">收藏</span></div>
            <a class="a" id="collect" href="tel:0871-68576958" @click="take_phone()">
              <b class="iconfont">&#xe65b;</b><span class="span">客服</span>
            </a>
            <div class="b row row-right" v-if="d.isIntegral==false&&d.show_knock==false">
              <p class="el-w-2" id="add-car" @click="buy_and_cart(0)">加入购物车</p>
              <p class="el-w-2" id="shop" @click="buy_and_cart(1)">立即购买</p>
            </div>
            <!--积分商城时显示-->
            <div class="row-right integral" v-if="d.isIntegral==true" @click="buy()">立即兑换</div>
            <!--拼团显示-->
            <div class="row-right row knoc" v-if="d.show_knock==true">
              <p class="el-w-2 a" @click="click_knock_buy(0)">￥{{ d.price_sell }}<br/>单独购买</p>
              <p class="el-w-2 b" @click="click_knock_buy(1)">￥{{ d.knock_price }}<br/>发起拼团</p>
            </div>
          </div>
        </div>
        <!--第二页-->
        <div class="li" id="goods-info" v-bind:style="{ height:d.h_+'px' }">
          <div class="gds_comment" id="gds_comment2">
            <div class="row">
              <p class="row-left">商品评价({{ d.comment_num }})</p>
              <p class="row-right" v-bind:class="{in_:d.cm_status}" @click="look_comment()">查看全部<i class="iconfont">&#xe64e;</i></p>
            </div>
            <div class="comment_item" v-for="(cm1,cm2) in d.cms" :key="cm2">
              <div class="com_head row">
                <p class="p row-left"><img class="img" mode="widthFix" v-bind:src="image.self_head"/></p>
                <i class="i row-left">{{ cm1.name }}</i>
                <em class="em row-left" v-for="(tag,ind) in cm1.tag" :key="ind">{{ tag }}</em>
              </div>
              <div class="cm_text">{{ cm1.contents }}</div>
              <div class="row cm_img">
                <p class="p" v-for="(ig,ind) in cm1.imgs" :key="ind"><img class="img" mode="widthFix" v-bind:src="ig"/></p>
              </div>
            </div>
          </div>
        </div>
        <!--第三页-->
        <div class="li" id="goods-last">
          <img class="img" mode="widthFix" v-for="im in d.detail_con" v-bind:src="im" :key="im"/>
        </div>
      </div>
    </div>
    <!--提示-->
    <div id="black-back" v-bind:style="{ display:d.hint.back }"></div>
    <div id="center-hint" v-bind:style="{ display:d.hint.c.dpy,opacity:d.hint.c.opc }">
      <div class="title">
        {{ d.cent_title }}
        <p class="icon" @click="center_hint('a',0)">
          <i class="ic1 i"></i>
          <i class="ic2 i"></i>
        </p>
      </div>
      <div class="plate1" v-if="d.knock_plate==true">
        <div class="knock-list">
          <div class="row" v-for="(us1,us2) in d.knock_user" :key="us2">
            <p class="p1 row-left"><img class="img" mode="widthFix" v-bind:src="us1.avatar"/></p>
            <div class="p2 row-left">
              <p class="p1"><i class="i1">{{ us1.name }}</i><i class="i2">还差{{ d.limit_people-us1.owe_num }}人拼成</i></p>
              <p class="p2">剩余{{ us1.rt }}</p>
            </div>
            <p class="p3 row-right" @click="to_knockt(us2)">去拼单</p>
          </div>
        </div>
        <p class="bot">仅显示10个发起拼团的人</p>
      </div>
      <div class="plate2" v-else>
        <p class="p1" v-if="d.dt_remain>0">仅剩<i class="i">{{ d.dt_remain }}</i>个名额，{{ d.dt_rt }}点后结束</p>
        <div class="people" v-if="d.dt_remain>0">
          <p class="el5" v-for="(ue,ind) in d.dt_user" :key="ind"><img class="img" v-bind:src="ue.avatar"/><i class="i" v-if="ue.is_master==1">拼主</i></p>
        </div>
        <p class="p3" v-else>手快有，手慢无哦，下次争取先人一步吧！</p>
        <p class="p2" @click="join_knock()">{{ d.bt_word }}</p>
      </div>
    </div>
    <!--单标签提示-->
    <div id="small-hint" v-bind:style="{ display:d.hint.s.dpy,opacity:d.hint.s.opc }">
      <em class="em">{{ d.hint.s.con }}</em>
    </div>
    <!--底部显示的提示-->
    <div id="bottom-hint" v-bind:style="{ display:d.hint.b.dpy,bottom:d.hint.b.btm }">
      <!--规格-->
      <div class="plate1" v-if="d.bt_stat[0]==true">
        <div class="info">
          <div class="row info_in">
            <div class="row-left le1">
              <p class="p"><img class="img" mode="widthFix" v-bind:src="d.here_img"/></p>
            </div>
            <div class="row-left le2">
              <p class="p1"><i class="i">￥</i>{{ d.here_price }}</p>
              <p class="p2">库存：{{ d.here_num }}件</p>
              <p class="p3">配送至：{{ d.address.address }}</p>
            </div>
          </div>
          <p class="sel_stand">规格选择</p>
          <p class="stand_list">
            <i class="i" v-for="(std,j) in d.stands" :key="j" @click="sel_stand(j)"  v-bind:style="{ background:std.in_ }" >
              {{ std.name }}
            </i>
          </p>
          <div class="row num">
            <p class="row-left">购买数量</p>
            <div class="row-right row">
              <div class="i row-left" @click="reduce()">-</div>
              <div class="b row-left">{{ d.here_sel_num }}</div>
              <div class="row-left i" @click="multi()">+</div>
            </div>
          </div>
        </div>
        <div class="row ability" v-bind:style="{ display:d.abil[0] }">
          <p class="el-w-2 left" @click="update_cart()">加入购物车</p>
          <p class="el-w-2 right" @click="buy()">立即购买</p>
        </div>
        <div class="row ability2" @click="click_sure()" v-bind:style="{ display:d.abil[1],background:d.sure_color }">确定</div>
      </div>
      <!--分享-->
      <div class="plate2" v-if="d.bt_stat[1]==true">
        <div class="title">选择要分享到的平台</div>
        <div class="row">
          <a class="el-w-4" @click="click_repeat()" v-if="show_headBar==true">
            <img class="img" mode="widthFix" v-bind:src="image.share_url"/>
            <p class="p" v-bind:style="{ color:d.share.col }">{{ d.share.word }}</p>
          </a>
          <a class="el-w-4" v-bind:href="share.xl" v-if="show_headBar==true">
            <img class="img" mode="widthFix" v-bind:src="image.share_xl"/>
            <p class="p">新浪微博</p>
          </a>
          <a class="el-w-4" v-bind:href="share.qq" v-if="show_headBar==true">
            <img class="img" mode="widthFix" v-bind:src="image.share_qq"/>
            <p class="p">QQ好友</p>
          </a>
          <a class="el-w-4" v-bind:href="share.qqSpace" v-if="show_headBar==true">
            <img class="img" mode="widthFix" v-bind:src="image.share_qqSpace"/>
            <p class="p">QQ空间</p>
          </a>
          <button class="el-w-4 button" v-if="show_headBar==false" open-type="share">
            <img class="img" mode="widthFix" v-bind:src="image.share_wx"/>
            <p class="p">微信好友</p>
          </button>
        </div>
      </div>
      <!--优惠券-->
      <div class="plate3" v-if="d.bt_stat[2]==true">
        <div class="title">优惠券</div>
        <div class="row" v-for="(p1,p2) in d.profit" :key="p2">
          <div class="row-left row" style="height: 4.6rem;">
            <div class="row-left">
              <p class="p1"><i class="i">￥</i>{{ p1.price }}</p>
              <p class="p2">{{ p1.limit }}</p>
            </div>
            <div class="row-right">{{ p1.name }}</div>
            <p class="p3"></p>
            <div class="txt" v-bind:style="{ marginTop:d.profit_top }">{{ p1.time }}</div>
          </div>
          <div class="row-right" style="height: 4.6rem;">
            <img class="img" v-if="p1.status==1" mode="widthFix" v-bind:src="image.get_finish"/>
            <p class="p1" v-if="p1.status==0" @click="get_coupon(p2)">点击领取</p>
            <p class="p2" v-else>已领取</p>
          </div>
        </div>
      </div>
      <!--说明-->
      <div class="plate4" v-if="d.bt_stat[3]==true">
        <p class="title">服务说明</p>
        <div class="content">
          <p class="txt" v-for="(s,ind) in d.service" :key="ind">{{ s.content }}</p>
        </div>
      </div>
      <p class="icon" @click="bottom_hint(0)">
        <i class="ic1 i"></i>
        <i class="ic2 i"></i>
      </p>
    </div>
    <img id="open_app_img" v-if="open_hint==true" v-bind:src="image.open_app_hint"/>
  </div>
</template>
  <script>
    var run;
  var d = {
    token:null,
    pid:null,
    //判断是否是来自积分商城的跳转
    isIntegral:false,
    integral:0,
    enter:0,
    sid:0,
    union_id:null,
    from_mid:0,
    //拼团相关
    sure_color:'#0fca9d',
    limit_people:2,
    here_kid:0,
    knock_price:0,
    show_knock:false,
    knock_user:[],
    knock_plate:true,
    cent_title:'正在拼团',
    t1:0,
    t2:0,
    t3:0,
    remain_time:0,
    join_num:0,
    dt_user:[],
    dt_remain:0,
    dt_rt:0,
    bt_word:'参与拼单',
    //规格相关
    here_id:null,
    here_price:'',
    here_num:'',
    here_img:'',
    here_name:'',
    here_sel_num:1,
    name:'',
    num:'',
    sel_num:1,
    keywords:'',
    detail_con:[],
    //特价日相关
    is_promotion:false,
    promotion_price:'',
    promotion_number:'',
    price_back_color:'#ff2e5a',
    activity_word:'限时抢购',
    //推荐相关
    recommend:[],
    recommend_width:360,
    //轮播图
    banners:[],
    first_img:'',
    last_img:'',
    //评价相关
    comment_num:0,
    cms:[],
    cm_status:false,
    //优惠券...
    profit_top:0,
    profit:[],
    explain:[],
    page_h:0,
    title_h:0,
    openApp_protocol:'',
    prof_one:{
      id:null,
      name:'暂无'
    },
    address:{
      address:'暂无'
    },
    //服务
    two_serve:[],
    service:[],
    exp_one:'',
    discript:'',
    price_org:'',
    price_sell:'',
    express:'',
    store:'',
    stands:[],
    is_collect:false,
    is_buy:true,
    //底部框确定按钮显示
    abil:['block','none'],
    //底部模块弹框,规格、分享、优惠券、说明
    bt_stat:[false,true,false,false],
    list_sta:[true,false,false],
    h_:'',
    //锚点跳转使用
    top:[0,0,0],
    //分享
    share:{
      url_:'',
      qq:'',
      qqSpace:'',
      xl:'',
      repeat_link:'',
      col:'#5d5d5d',
      word:'复制链接'
    },
    // 轮播图使用,rotating(),normalEl(),run,el_手指事件均属于轮播图部分
    el_: {
      out_w:0,
      w: 0,
      h: 0,
      num: 3,
      initx: 0,
      inity: 0,
      move:'',
      movex: '-100%',
      movey: 0,
      endx: 0,
      endy: 0,
      //当前序列数
      ord:2,
      canMove: true,
      points:[],
      tran: 'none'
    },
    /*提示部分使用*/
    hint:{
      back:'none',
      s:{dpy:'none',opc:'0',con:'提示内容'},
      c:{dpy:'none',opc:'0.4',con:''},
      b:{dpy:'block',btm:'-100%',con:''}
    },
    /*滑动部分使用*/
    move_el:{
      out_w:0,
      w: 0,
      h: 0,
      num: 3,
      initx: 0,
      inity: 0,
      move:'',
      movex: '0',
      movey: 0,
      endx: 0,
      endy: 0,
      //当前序列数
      ord:0,
      tran:'left 0.3s linear',
      canMove: true
    },
    linea:{
      w:32,
      move:0,
      move_d:0
    }
  };
  function rotating(){
    // 轮播播放,移动元素，改变点点状态。
    d.el_['tran'] = 'left 0.3s linear';
    var len = d.el_['num']+2;
    d.el_['movex'] = -(d.el_['ord']*d.el_['w']);
    for(var t=0;t<d.el_['points'].length;t++){
      d.el_['points'][t]['in_'] = t===d.el_['ord']-1 ? true : false;
    }
    if(d.el_['ord'] === len-1) {
      d.el_['ord'] = 1;
      setTimeout(function(){
        d.el_['tran'] = 'none';
        d.el_['movex'] = -d.el_['w'];
      },300);

      //host_el.animate({left: -img_width + "px"}, 0);
      for(var v=0;v<d.el_['points'].length;v++){
        d.el_['points'][v]['in_'] = v===0 ? true : false;
      }
    } else if(d.el_['ord'] === 0) {
      d.el_['ord'] = len - 2;
      setTimeout(function(){
        d.el_['tran'] = 'none';
        d.el_['movex'] = -((len-2)*d.el_['w']);
      },300);
      for(var v=0;v<d.el_['points'].length;v++){
        d.el_['points'][v]['in_'] = v===d.el_['ord'] ? true : false;
      }
    }
    d.el_['ord']++;
  }
  // 初始化大小
    function normalEl(){
      // 请求完数据后进入这个函数
      var arr;
     d.el_['ord'] = 2;
      //这里赋值上屏幕宽x参数。
      //这里改成请求得到的数据
      d.el_.out_w = d.el_['w']*(d.el_['num']+2);
      d.el_['movex'] = -d.el_['w'];
      //设置点点数据
      for(var k=0;k<d.banners.length;k++){
        arr = {};
        arr['in_'] = k===0 ? true : false;
        d.el_['points'].push(arr);
      }
      setTimeout(function(){
        d.el_['tran'] = 'left 0.3s linear';
      },100);
      if(d.el_['num']>1){
        run = setInterval(rotating,3000);
      }
    }
    function small_hint(info){
      // 单标签提示
      d.hint.s.con = info;
      d.hint.s.dpy = "block";
      d.hint.s.opc = "1";
      setTimeout(function(){
        d.hint.s.opc = "0";
      },2000);
      setTimeout(function(){
        d.hint.s.dpy = "none";
      },2300);
    }

export default {
  data(){
    return{
      d
    }
  },
  methods:{
    backTo(){
      this.backPage();
    },
    getInfo() {
      var share_link;
      this.check_title_show();
      d.token = this.get_token();
      d.h_ = this.getWindowSize()[1];
      d.isIntegral = this.get_url_argments('integral')=='true' ? true : false;
      d.pid = parseInt(this.get_url_argments('pid'));
      d.sid = this.get_url_argments('sid');
      d.share.url_ = this.environment()=='web' ? window.location.href : ' ';
      d.union_id = this.get_url_argments('union_id');
      d.from_mid = this.get_url_argments('from_mid');
      d.list_sta = [true,false,false];
      d.two_serve = [];
      //清除计时器timeout，重置底部弹框。
      clearTimeout(run_time);
      this.bottom_hint(0);
      //处理sid
      if(d.sid===null||d.sid=='null'||d.sid==''){d.sid = ''}
      else{d.sid = parseInt(d.sid);}
      //清除一次轮播
      clearInterval(run);
      //初始化线条参数
      var w = this.getWindowSize()[0];
      d.linea.move_d = (w*0.65/3 - d.linea.w)/2;
      d.linea.move = d.linea.move_d;
      /*顶部提示条的高*/
      d.page_h = this.show_headBar==true ? (w*42/375) : 0;
      d.title_h = this.show_headBar==true ? (w*45/375) : 0;
      d.profit_top = this.show_headBar===true ? 0 : '-0.21rem';
      d.enter += 1;
      this.getDatas();
      if(this.show_headBar===true){
        share_link = window.location.href;
        this.take_share(share_link);
      }
      this.take_el_top();
      this.take_app_protocol();
      this.get_cart_num();
      this.get_info_num();
    },
    getDatas() {
      //获取数据
      var self = this;
      this.request({
        method: 'post',
        url: this.$url['pDetail']['goodsInfoDatURL'],
        data: {
          'goods_id': d.pid,
          'token': d.token,
          'union_id':d.union_id
        },
        dataType:'json',
        success: function (res) {
         // var res_ = res['status']!='undefined' ? res : res.data;
          var res_;
          var obj, len,as;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if (res_.status == 1) {
            obj = res_.data;
            d.banners = obj['imgs'];
            d.el_['num'] = d.banners.length;
            len = d.banners.length;
            if(obj['imgs'].length>0){
              d.first_img = obj['imgs'][0];
              d.last_img = obj['imgs'][len - 1];
            }
            normalEl();

            d.name = obj['name'];
            d.integral = obj['integral'];
            d.store = obj['supper_name'];
            d.num = obj['number'];
            d.sel_num = obj['sales_volume'];
            d.price_sell = obj['sell_price'];
            d.price_org = obj['markets_price'];
            d.keywords = obj['keywords'];
            d.is_collect = obj['is_collect'] == 0 ? false : true;

            d.service = obj['service'];
            d.two_serve.push(d.service[0]);
            d.two_serve.push(d.service[1]);
            //推荐
            if(obj['recommend']){
              d.recommend = obj['recommend'];
              d.recommend_width = obj['recommend'].length*((d.el_['w']*110)/375) + (d.el_['w']*10)/375;
            }
            //特价部分
            if(obj['promotion']==null||obj['promotion']=='null'){
              d.is_promotion = false;
            }
            else{
              d.is_promotion = true;
              d.activity_word = '限时抢购';
              d.price_back_color = '#ff2e5a';
              d.promotion_number = obj['promotion']['promotion_number'];
              d.promotion_price = obj['promotion']['promotion_price'];
              d.remain_time = Number(obj['promotion']['remain_time']);
              d.price_sell = obj['promotion']['promotion_price'];

              count_time();
            }
            //拼团部分
            d.show_knock = obj['unionbuy']==null||obj['unionbuy']=='null' ? false : true;
            if(d.show_knock===true){
              d.sure_color = '#ff6445';
              d.activity_word = '限时拼团';
              d.price_back_color = '#ff6445';
              d.join_num = obj['unionbuy']['progress_num'];
              d.limit_people = obj['unionbuy']['limit_number'];
              d.remain_time = Number(obj['unionbuy']['remain_time']);
              d.knock_price = obj['unionbuy']['buy_price'];
              count_time();
              for(var xc=0;xc<obj['unionbuy']['list'].length;xc++){
                as = Number(obj['unionbuy']['list'][xc]['remain_time']);
                obj['unionbuy']['list'][xc]['rt'] = Math.floor(as/60/60)+':'+Math.floor(as/60%60)+':'+Math.floor(as%60);
              }
              d.knock_user = obj['unionbuy']['list'];
            }
            else{ d.sure_color = '#0fca9d';}
            //规格相关参数
            d.stands = obj['spec_goods'];
            for (var c = 0; c < d.stands.length; c++) {
              if(c===0){
                if(d.show_knock===true){d.stands[c]['in_'] = '#ff6445';}
                else{d.stands[c]['in_'] = '#0fca9d';}
              }
              else{
                d.stands[c]['in_'] = '#cdcdcd';
              }
            }
            if(d.stands.length>0){
              //第一个规格价格该改为特价日价格。
              if(d.is_promotion===true){
                d.stands[0]['sell_price'] = d.promotion_price;
              }

              //选中第一个规格数据。
              d.here_num = d.stands[0]['number'];
              d.here_price = d.stands[0]['sell_price'];
              d.here_id = d.stands[0]['id'];
            }
            d.here_name = d.name;
            d.here_img = obj['thumb'];
            d.explain = obj['express_fee'];
            d.express = obj['express_fee'] || '暂无运费信息';

            d.exp_one = d.explain!=null&&d.explain.length>0 ? d.explain[0]['name'] : '暂无' ;
            //评价相关数据
            for(var cmt=0;cmt<obj['comment']['list'].length;cmt++){
              if(obj['comment']['list'][cmt]['name']==''){
                obj['comment']['list'][cmt]['name'] = '匿名';
              }
            }
            d.comment_num = obj['comment']['total'];
            d.cms = obj['comment']['list'];
            d.cm_status = obj['comment']['list'].length===0 ? true : false;
            //未登录情况数据处理
            if(obj['def_address']){
              d.address = obj['def_address'];
            }
            setTimeout(function(){
              d.profit = obj['info_coupon'];
              if(d.profit.length>0){
                d.prof_one = obj['info_coupon'][0];
              }
              d.detail_con = obj['content_img'];
            },500);
            self.take_share(d.share.url_);
          } else {
            small_hint(res_.msg);
          }
        }
      });
    },
    take_app_protocol(){
      //处理app唤醒协议
      var sys;
      try{
        sys = navigator.userAgent;
      }
      catch (e) {
        wx.getSystemInfo({
          success(res){
            sys = res.model;
          }
        });
      }
      var isAndroid = sys.indexOf('Android')!=-1 || sys.indexOf('Adr')!=-1 ? true : false;
      if(isAndroid===true){
        //Android app 唤醒协议,
        d.openApp_protocol = 'ganma://com.lhave.wzq/open?type=goods|'+ d.pid +'-storeid:'+d.sid+'-union_id:'+d.union_id+'-from_mid:'+d.from_mid;
      }
      else{
        //ios app唤醒协议
        if(d.sid==null||d.sid=='null'||d.sid==''){
          d.sid = 0;
        }
        d.openApp_protocol = 'GanMaApp://product?id='+d.pid+'&storeid='+d.sid+'&union_id='+d.union_id+'&from_mid='+d.from_mid;
      }
    },
    to_cart(){
      //点击到购物车
      this.to_page('../pages/cart/main?token='+d.token);
    },
    close_hint(){
      //关闭头部的打开app提示
      d.page_h = 0;
    },
    click_repeat(){
      //点击复制链接
      if(this.environment()==='web'){
        var inp = document.createElement('input');
        inp.value = d.share.url_;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand('Copy');
        inp.style.display = "none";
      }
      else{
        this.wx_copy(d.share.url_);
      }
      d.share.col='#0fca9d';
      d.share.word = '已复制';
    },
    to_knockt(a){
      //click to knock
      var i = parseInt(a);
      var uid = d.knock_user[i]['id'];
      d.dt_rt = d.knock_user[i]['rt'];

      this.center_hint('e',1);
      d.knock_plate = false;
      var self = this;
      this.request({
        method:'post',
        url:this.$url['pDetail']['lookKnockURL'],
        data:{
          'token':d.token,
          'union_id':uid
        },
        dataType:'json',
        success:function(res){
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if(res_.status==1){
            //之后把10换成d.limit_people
            d.dt_remain = d.limit_people-res_.data.length;

            if(d.dt_remain<=0){
              d.cent_title = d.knock_user[i]['name']+'发起的拼团已结束';
              d.bt_word = '逛逛其它的团';
            }
            else{
              d.cent_title = '参与'+d.knock_user[i]['name']+'的拼团';
              d.bt_word = '参与拼团';
              d.here_kid = uid;
            }
            d.dt_user = res_.data;
          }
          else{
            small_hint(res_.msg);
          }
        }
      });
    },
    all_knock(){
      //look all knocks
      d.knock_plate = true;
      this.center_hint('gh',1);
    },
    join_knock(){
      //click join knock
      if(d.dt_remain<=0){
        this.all_knock();
      }
      else{
        d.union_id = d.here_kid;
        d.is_buy = true;
        d.bt_stat = [true,false,false,false];
        d.abil = ['none','block'];
        this.center_hint('v',0);
        this.click_knock_buy(1);
      }
    },
    click_knock_buy(i){
      //点击拼团的两个购买按钮
      if(d.token===null||d.token==='null'){
        this.to_page('../pages/login/main');
      }
      d.abil = ['none','block'];
      d.bt_stat = [true,false,false,false];
      if(i==1){
        if(d.union_id===null||d.union_id==0){
          small_hint('请先选择拼单');
          return;
        }
        //改变规格选择处的价格，和第一个规格的价格。
        d.here_price = d.knock_price;
        d.stands[0]['sell_price'] = d.knock_price;
      }
      else{
        d.here_price = d.price_sell;
      }
      this.bottom_hint(1);
    },
    get_coupon(r){
      //领取优惠券
      var a = parseInt(r);
      var id_ = d.profit[a]['id'];
      this.request({
        method:'post',
        url:this.$url['pDetail']['getCoupnURL'],
        data:{
          'token':d.token,
          'id':id_
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
          if (res_.status == 1) {
            d.profit[a]['status'] = 1;
          }
          else{
            small_hint('领取失败');
          }
        }
      });
    },
    to_addr(){
      //去更换地址
      if(d.token!=null&&d.token!='null'){
        this.to_page('../pages/manage_addr/main?back=true');
      }
      else{
        this.to_page('../pages/login/main');
      }
    },
    sel_combo(){
      //点击已选,选择套餐
      d.abil = ['block','none'];
      d.bt_stat = [true,false,false,false];
      this.bottom_hint(1);
    },
    click_collect(){
      //click collect icon to alter status
      if(d.token===null||d.token==='null'){
        this.to_page('../pages/login/main');
      }
      var sta;
      if(d.is_collect===true){
        // cancel collect op
        sta = 0;
      }
      else{
        sta = 1;
      }
      this.request({
        method:'post',
        url:this.$url['self']['cancelURL'],
        data:{
          'token':d.token,
          'status':sta,
          'link_id':d.here_id,
          'type':1
        },
        dataType:'json',
        success:function(res){
          var res_,txt;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if(res_.status==1){
            d.is_collect = sta===0 ? false : true;
            txt = sta===0 ? '已取消收藏' : '已收藏';
            small_hint(txt);
          }
          else{
            small_hint('error');
          }
        }
      });
    },
    click_sure(){
      //点击确定
      var lg = this.judge_login();
      if(lg===true){
        if(d.is_buy===true){
          this.buy();
        }
        else{
          this.update_cart();
        }
      }
      else{
        this.to_page('../pages/login/main');
      }
    },
    buy_and_cart(i) {
      // 点击外部的加入购物车或购买,判断是否已登录
      var a = parseInt(i);
      d.abil = ['none','block'];
      if(d.token!=null&&d.token!='null'){
        d.bt_stat = [true,false,false,false];
        //是加入购物车操作还是购买操作
        d.is_buy = a===0 ? false : true;
        this.bottom_hint(1);
      }
      else{
        this.to_page('../pages/login/main');
      }
      //this.bottom_hint(1);
    },
    judge_login() {
      if(d.token) {
        return true;
      } else {
        return false;
      }
    },
    open_plate(i){
      var a = parseInt(i);
      for(var p=0;p<d.bt_stat.length;p++){
       d.bt_stat[p] = p===a ? true : false;
      }
      this.bottom_hint(1);
    },
    to_detail(a){
      var i = parseInt(a);
      var pid = d.recommend[i]['id'];
      this.to_page('../pages/pDetail/main?token='+d.token+'&pid='+pid);
      this.refreshPage();
    },
    sel_stand(j) {
      //选择规格
      var j = parseInt(j);
      var colous = d.show_knock===true ? '#ff6445' : '#0fca9d';
      for (var k = 0; k < d.stands.length; k++) {
        d.stands[k]['in_'] = k === j ? colous : '#cdcdcd';
      }
      //这个方式渲染很慢
      // for (var k = 0; k < d.stands.length; k++) {
        // d.stands[k]['in_'] = k === j ? "#0fca9d" : false;
      // }
      //下面这个是正常渲染速度的处理
      var lastData = [];
      for(var i = 0 ;i < d.stands.length ; i++){
        lastData.push(d.stands[i])
        lastData[i]['in_'] = i === j ? "#0fca9d" : "";
      }
      d.stands = lastData;
      d.here_id = d.stands[j]['id'];
      d.here_price = d.stands[j]['sell_price'];
      d.here_num = d.stands[j]['number'];
      d.here_img = d.stands[j]['thumb'];
      d.here_name = d.stands[j]['name'];
    },
    multi() {
      //点击加
      if (d.here_sel_num < d.here_num) {
        d.here_sel_num += 1;
      }
    },
    reduce() {
      // 点击减
      if (d.here_sel_num > 1) {
        d.here_sel_num -= 1;
      }
    },
    update_cart() {
      // 加入购物车
      if(d.token===null||d.token==='null'){
        this.to_page('../pages/login/main');
        return;
      }
      var self = this;
      this.request({
        method: 'post',
        url: this.$url['pDetail']['addCartURL'],
        data: {
          "token": d.token,
          "goods_id": d.here_id,
          "goods_num": d.here_sel_num,
          "status": 1,
          "commission_id":d.sid
        },
        dataType:'json',
        success: function (res) {
          var res_;
          if(res.statusCode){res_ = res.data;}
          else{res_ = res;}
          if (res_.status == 1) {
            small_hint('已加入购物车');
            self.bottom_hint(0,'a');
            self.get_cart_num();
          } else {
            small_hint(res_.msg);
          }
        }
      });
    },
    buy(){
      //购买
      if(d.token===null||d.token==='null'){
        this.to_page('../pages/login/main');
        return;
      }
      var typ;
      if(d.isIntegral===true){
        typ = 1;
      }
      else if(d.knock_user.length>0){
        typ = 3;
      }
      else if(d.is_promotion===true){
        //拼团
        typ = 2;
      }
      else{
        typ = 0;
      }
      var self = this;
        this.request({
          method:'post',
          url:this.$url['pDetail']['subFormURL'],
          data:{
            'token':d.token,
            'goods_id':d.here_id,
            'goods_num':d.here_sel_num,
            'commission_id':d.sid,
            'coupon_id':d.prof_one.id,
            'union_id':d.union_id,
            'buy_type':typ,
            'from_mid':''
          },
          dataType:'json',
          success:function(res){
            var res_;
            if(res.statusCode){res_ = res.data;}
            else{res_ = res;}
            if(res_.status==1){
              //token,优惠券id、地址id
              self.to_page('../pages/submitForm/main?token='+d.token+'&cpid='+d.prof_one.id+'&adid='+
                d.address.id+'&actid=null&integral='+d.isIntegral);
            }
            else{small_hint(res_.msg);}
          }
        });
    },
    click_nav(a){
      //web端点击
      var i = parseInt(a);
      var out_el = document.getElementById('host-in');
      d.move_el['ord'] = i;
      d.linea.move = d.linea.move_d + d.move_el['ord']*(d.linea['move_d']*2) + d.move_el['ord']*31;
      for(var c=0;c<d.list_sta.length;c++){
        d.list_sta[c] = c===d.move_el['ord'] ? true : false;
      }
      out_el.scrollTop = d.top[i];
    },
    look_comment(){
      //look all comments
      if(d.comment_num>=1){
        this.to_page('../pages/commentList/main?token='+d.token+'&pid='+d.pid);
      }
    },
    take_el_top(){
      //计算元素距离父元素top值，做锚点跳转
      if(this.show_headBar===true){
        var comment = document.getElementById('gds_comment');
        var detail = document.getElementById('gds_detail');
        d.top[1] = comment.offsetTop-50;
        d.top[2] = detail.getBoundingClientRect().top+70;
      }
    },
    center_hint:function(info,i){
      d.hint.c.con = info || '';
      if(i===0){
        //关闭
        d.hint.back = 'none';
        d.hint.c.dpy = 'none';
        d.hint.c.opc = '0.4';
      }
      else{
        d.hint.back = 'block';
        d.hint.c.dpy = 'block';
        d.hint.c.opc = '1';
      }
    },
    wx_move(){
      return;
    },
    bottom_hint: function (i) {
      // 底部模板部分
      if (i === 0) {
        // 关闭
        d.hint.b.btm = "-100%";
        setTimeout(function () {
          d.hint.back = 'none';
          //d.hint.b.dpy = 'none';
        }, 300);
      } else {
        d.hint.back = 'block';
        //d.hint.b.dpy = 'block';
        d.hint.b.btm = '0';
      }
    },
    elStart: function (ev) {
      // 我的轮播图插件部分
      // 手指触屏
      d.el_.tran = "none";
      clearInterval(run);
      d.el_['initx'] = ev.touches[0].pageX;
      d.el_['inity'] = ev.touches[0].pageY;
      d.el_['canMove'] = true;
    },
    elMove: function (ev) {
      // 移动,用元素当前的left值计算此时的序列值
      var x = ev.touches[0].pageX;
      var y = ev.touches[0].pageY;

      if (d.el_['canMove'] === false||d.el_['num']<=1) {
        return;
      }
      if (Math.abs(d.el_['initx'] - x) <= 10 || Math.abs(d.el_['initx'] - x) < Math.abs(d.el_['inity'] - y)) {
        return;
      } else {
        // 如果是轮播图可不用判断是左右滑动。
        if (x < d.el_['initx']) {
          //手指是从右向左滑动,看情况是否限制边界滑动,1是一个正则参数控制移动距离。
          //if(ord>=dts.el_info['ord']){return}
          d.el_['movex'] = -((d.el_['ord'] - 1) * d.el_['w']) + (x - d.el_['initx']);
        } else {
          d.el_['movex'] = -((d.el_['ord'] - 1) * d.el_['w']) + (x - d.el_['initx']);
        }
      }
    },
    elEnd: function (ev) {
      // 手指离开,兼容两端的操作,这里要为元素添加transition属性[或在Move函数末尾添加]
      var x;
      try {
        x = ev.mp.changedTouches[0].pageX;
      } catch (e) {
        x = ev.changedTouches[0].pageX;
      }
      d.el_.tran = "left 0.3s linear";
      if(Math.abs(x-d.el_.initx)<10||d.el_['num']<=1){
        return;
      }
      if (x > d.el_['initx']) {
        //手指从左向右滑
        d.el_['ord'] -= 2;
        rotating();
      } else {
        rotating();
      }
      run = setInterval(rotating, 3000);
    },
    m_elStart: function (ev) {
      // 手指触屏
      if(this.show_headBar===true){
        return;
      }
      else{
        d.move_el.tran = 'none';
        d.move_el['initx'] = ev.touches[0].pageX;
        d.move_el['inity'] = ev.touches[0].pageY;
        d.move_el['canMove'] = true;
      }
    },
    m_elMove: function (ev) {
      // 移动,用元素当前的left值计算此时的序列值
      var x = ev.touches[0].pageX;
      var y = ev.touches[0].pageY;

      if (d.move_el['canMove'] === false||this.show_headBar===true) {
        return;
      }
      if (Math.abs(d.move_el['initx'] - x) <= 10 || Math.abs(d.move_el['initx'] - x) < Math.abs(d.move_el['inity'] - y)) {
        return;
      } else {
        // 如果是轮播图可不用判断是左右滑动。
        if (x < d.move_el['initx']) {
          //手指是从右向左滑动,看情况是否限制边界滑动,1是一个正则参数控制移动距离。
          if(d.move_el['ord']>=d.move_el['num']-1){
            return;
          }
          else{
            d.move_el['movex'] = -(d.move_el['ord'] * d.move_el['w']) + (x - d.move_el['initx']);
          }
        } else {
          if(d.move_el['ord']<=0){
            return;
          }
          else{
            d.move_el['movex'] = -(d.move_el['ord'] * d.move_el['w']) + (x - d.move_el['initx']);
          }
        }
      }
    },
    m_elEnd: function (ev) {
      // 手指离开,兼容两端的操作,这里要为元素添加transition属性[或在Move函数末尾添加]
      d.move_el.tran = 'left 0.3s linear';
      var x,y,can_slide;

      try {
        x = ev.mp.changedTouches[0].pageX;
        y = ev.mp.changedTouches[0].pageY;
      } catch (e) {
        x = ev.changedTouches[0].pageX;
        y = ev.changedTouches[0].pageY;
      }
      can_slide = Math.abs(d.move_el['initx']-x)>Math.abs(d.move_el['inity']-y) ? true : false;
      if(Math.abs(x-d.move_el.initx)<10||this.show_headBar===true){
        return;
      }
      if (x > d.move_el['initx']) {
        //手指从左向右滑
        if(d.move_el['ord']<=0){
          return;
        }
        else{
          if(can_slide===true){d.move_el['ord'] -= 1;}
        }
      } else {
        if(d.move_el['ord']>=d.move_el['num']-1){
          return;
        }
        else{
          if(can_slide===true){d.move_el['ord'] += 1;}
        }
      }
      //刷新状态
      for(var c=0;c<d.list_sta.length;c++){
        d.list_sta[c] = c===d.move_el['ord'] ? true : false;
      }
      d.linea.move = d.linea.move_d + d.move_el['ord']*(d.linea['move_d']*2) + d.move_el['ord']*31;
      //结尾判断
      this.slide_el();
    },
    click_list(i){
      //点击头部列表滑动
      var a = parseInt(i);
      d.move_el['ord'] = a;
      if(this.show_headBar===true){
        this.click_nav(a);
      }
      else{
        d.linea.move = d.linea.move_d + d.move_el['ord']*(d.linea['move_d']*2) + d.move_el['ord']*31;
        this.slide_el();
        for(var c=0;c<d.list_sta.length;c++){
          d.list_sta[c] = c===d.move_el['ord'] ? true : false;
        }
      }
    },
    slide_el(){
      //滑动元素处理
      d.move_el['movex'] = -d.move_el['ord']*d.move_el['w'];
    }
  },
  created() {

  },
  onLoad(){
    d.name = '';
    d.banners = [];
    d.first_img = '';
    d.last_img = '';
    d.num = '';
    d.price_sell = '';
    if(this.show_headBar===false){
      this.getInfo();
    }
  },
  mounted () {
    d.move_el['w'] = this.getWindowSize()[0];
    d.el_['w'] = this.getWindowSize()[0];
    d.here_sel_num = 1
    if(this.show_headBar===true){
      d.name = '';
      d.banners = [];
      d.first_img = '';
      d.last_img = '';
      d.num = '';
      d.price_sell = '';
      this.getInfo();
    }
  }
}

var run_time;
//拼团限时计时。
function count_time(){
    var s,m,tt;
    tt = Math.floor(d.remain_time/60);
    s = Math.floor(d.remain_time%60);
    m = Math.floor(tt%60);
    d.t1 = Math.floor(tt/60);

    d.t2 = m<10 ? '0'+m : m;
    d.t3 = s<10 ? '0'+s : s;
    if(d.t1===0&&m===0&&s==0){
      return;
    }
    d.remain_time -= 1;
    run_time = setTimeout(count_time,1000);
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
  @b_gray:#dddddd;
  @r_size:19rem;
  @w1:56rem;
  @size:18.75rem;
  #pdetail-all{
    position: absolute;
    height: 100%;
    overflow: hidden;
    width: 100%;
    background: @bg_color;
    >.ph-nav{
      >.cart{
        display: block;
        position: absolute;
        top: 15/@size;
        font-size: 20/@size;
        color: @f_green;
        left: 290/@size;
      }
      >.info{
        position: absolute;
        top: 14/@size;
        right: 20/@size;
        >.iconfont{
          position: relative;
          font-size: 22/@size;
        }
      }
    }
    #center-hint{
      position: fixed;
      width: 78.66%;
      z-index: 1300;
      top: 118/@size;
      margin-top: 0;
      left: 10.5%;
      background: white;
      -webkit-border-radius: 5/@size;
      -moz-border-radius: 5/@size;
      border-radius: 5/@size;
      >.title{
        position: relative;
        padding: 10/@size;
        font-size: 16/@size;
        text-align: center;
        /*叉叉按钮*/
        >.icon{
          position: absolute;
          width: 0.75rem;
          height: 0.75rem;
          right: 10/@size;
          top: 10/@size;
          padding: 0;
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
      >.plate1{
        position: relative;
        >.knock-list{
          position: relative;
          padding: 0 10/@size;
          height: 342/@size;
          overflow-y: scroll;
          >.row{
            padding: 8/@size 0;
            >.p1{
              width: 30/@size;
              height: 30/@size;
              overflow: hidden;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              >.img{
                position: relative;
                width: 100%;
              }
            }
            >.p2{
              padding-left: 6/@size;
              >.p1{
                position: relative;
                height: 19/@size;
                >.i1{
                  position: relative;
                  display: inline-block;
                  font-size: 14/@size;
                  margin-right: 10/@size;
                  width: 70/@size;
                  overflow: hidden;
                  white-space: nowrap;
                  -ms-text-overflow: ellipsis;
                  text-overflow: ellipsis;
                }
                >.i2{
                  position: relative;
                  display: inline-block;
                  font-size: 12/@size;
                  top: -4/@size;
                  color: @f_gray;
                }
              }
              >.p2{
                position: relative;
                font-size: 14/@size;
              }
            }
            >.p3{
              position: relative;
              font-size: 16/@size;
              padding: 2/@size 12/@size;
              color: white;
              margin-top: 8/@size;
              background: @f_red;
              -webkit-border-radius: 15/@size;
              -moz-border-radius: 15/@size;
              border-radius: 15/@size;
            }
          }
        }
        >.bot{
          position: relative;
          text-align: center;
          padding: 8/@size;
          color: @f_gray;
          font-size: 12/@size;
        }
      }
      >.plate2{
        position: relative;
        >.p1{
          position: relative;
          text-align: center;
          font-size: 12/@size;
          padding: 10/@size 0;
          color: @f_back;
          >.i{
            display: inline;
            color: @f_red;
          }
        }
        >.people{
          display: flex;
          display: -webkit-flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0 10/@size;
          >.el5{
            position: relative;
            width: 50/@size;
            height: 50/@size;
            overflow: hidden;
            margin-bottom: 10/@size;
            >.img{
              position: relative;
              width: 100%;
            }
            >.i{
              display: block;
              position: absolute;
              z-index: 160;
              font-size: 12/@size;
              background: #f0bd6e;
              color: white;
              padding: 0 3px;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
              border: 1px solid @f_red;
              top: -2/@size;
              left: -2/@size;
              -webkit-transform: scale(0.8);
              -moz-transform: scale(0.8);
              -ms-transform: scale(0.8);
              -o-transform: scale(0.8);
              transform: scale(0.8);
            }
          }
        }
        >.p3{
          position: relative;
          text-align: center;
          font-size: 14/@size;
          color: @f_dgray;
          padding: 20/@size 0;
        }
        >.p2{
          position: relative;
          width: 93.22%;
          margin: 5/@size auto;
          text-align: center;
          color: white;
          font-size: 16/@size;
          padding: 10/@size;
          background: @f_red;
          -webkit-border-radius: 20/@size;
          -moz-border-radius: 20/@size;
          border-radius: 20/@size;
        }
      }
    }
  }

  #head{
    position: absolute;
    background: white;
    padding-top:0.52rem;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 600;
    #head-h2{
      position: relative;
      width: 64%;
      left: 18%;
      >.p{
        text-align: center;
        >.i{
          display: inline-block;
          font-size: 16px;
          font-weight: 500;
          padding-bottom: 0.9rem;
          border-bottom: 2px solid transparent;
        }
        >.i_in{
          color: @f_green;
        }
      }
      /*移动线条*/
      #linea{
        position: absolute;
        height: 2px;
        bottom: 1px;
        left: 10%;
        background: @f_green;
        transition: left 0.3s linear;
        -webkit-transition:left 0.3s linear;
        -ms-transition:left 0.3s linear;
        -moz-transition:left 0.3s linear;
      }
    }
  }

  .el-move{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    >.move-content{
      position: absolute;
      width: 300%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      /*height: 500px;*/
      >.li{
        position: absolute;
        background: @bg_color;
        padding-top: 50/@size;
        width: 33.33%;
        height: 100%;
        overflow-y: scroll;
      }
      #goods-host{
        top: 0;
        left: 0;
        padding-bottom: 52px;
        overflow: hidden;

      }
      #goods-info{
        left: 33.33%;
        background: transparent;
        padding: 120/@size 0;
        text-align: center;
        font-size: 18/@size;
        color: @f_dgray;
      }
      #goods-last{
        right: 0;
      }
    }
  }
  .move-content::after{
    content: "";
    display: block;
    clear: both;
  }
  #host-in{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-top: 50/@size;
    scroll-behavior: smooth;
    padding-bottom: 150/@size;
    top: 0;
    left: 0;
        >.my_rotate {
          position: relative;
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          min-height: 375/@size;
          max-height: 400/@size;
          >.points{
            position: absolute;
            z-index: 10;
            width: 2.63rem;
            height:1.31rem;
            left: 50%;
            margin-left: -1.31rem;
            bottom: 1.05rem;
            line-height: 1.31rem;
            font-size: 14px;
            color: white;
            text-align: center;
            background: rgba(0,1,3,.6);
            border-radius: 47%;
            -webkit-border-radius: 47%;
            -moz-border-radius:47%;
            -ms-border-radius: 47%;
          }
          > .contain_img {
            position: relative;
            top: 0;
            left: 0;
            overflow: hidden;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            :after, #standard:after {
              content: "";
              display: block;
              clear: both;
            }
            >.img {
              display: block;
              position: relative;
              float: left;
            }
          }
        }
    >.knock{
      height: 65/@size;
      >.row-left{
        width: 68%;
        background: #ff6445;
        padding-left: 10/@size;
        height: 65/@size;
        padding-top: 8/@size;
        >.p1{
          position: relative;
          color: white;
          >.i{
            display: inline-block;
            font-size: 14px;
            color: white;
          }
          >.b{
            display: inline-block;
            font-size: 18px;
            color: white;
          }
          >.em{
            display: inline-block;
            font-size: 14px;
            padding-left: 4px;
            color: white;
            text-decoration: line-through;
          }
        }
        >.p2{
          position: relative;
          font-size: 12px;
          color: white;
        }
      }
      >.row-right{
        width: 32%;
        background: #ffc837;
        height: 65/@size;
        padding-top: 4/@size;
        padding-right: 0;
        >.p1{
          position: relative;
          width: 100%;
          height: 27/@size;
          padding-left: 12/@size;
          padding-top: 3/@size;
          display: block;
          >.img{
            position: relative;
            margin-top: 2/@size;
            width: 14/@size;
            margin-right: 3/@size;
          }
          >.i{
            color: #b12b00;
            font-size: 14/@size;
          }
        }
        >.p2{
          position: relative;
          display: block;
          color: white;
          width: 100%;
          padding-left: 12/@size;
          padding-right: 0;
          height: 24/@size;
          left: 0;
          margin-left: 0;
          text-align: left;
          white-space: nowrap;
          >.i{
            padding: 0 3/@size;
            font-size: 12/@size;
            text-align: center;
            margin: 0;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            background: #f9a029;
          }
          >.i1{
            padding: 0 2/@size;
            font-size: 12/@size;
          }
        }
      }
      >.row-right:before{
        content: '';
        position: absolute;
        top: 50%;
        margin-top: -12/@size;
        left: -12/@size;
        border-top: 12/@size solid transparent;
        border-bottom: 12/@size solid transparent;
        border-left: none;
        border-right: 12/@size solid #ffc837;
      }
    }
        #price{
          padding: 0.73rem 0.5rem 0.52rem 0.5rem;
          background: white;
          >.row-left{
            >.p1{
              position: relative;
              >.i{
                display: inline-block;
                font-size: 14px;
                color: @f_red;
              }
              >.b{
                display: inline-block;
                font-size: 18px;
                color: @f_red;
              }
              >.em{
                display: inline-block;
                font-size: 14px;
                padding-left: 4px;
                color: @f_dgray;
                text-decoration: line-through;
              }
            }
            >.p2{
              position: relative;
              font-size: 12px;
              color: @f_gray;
            }
          }
          >.row-right{
            font-size: 14px;
            >.iconfont{
              display: inline-block;
              font-size: 14px;
            }
            >.em{
              font-size: 14px;
              padding-left: 2px;
              display: inline-block;
            }
          }
        }
        >.p-integral{
          position: relative;
          padding: 11/@size;
          font-size: 16px;
          color: @f_green;
          background:white;
          font-weight: 600;
        }
        /*描述*/
        #discript{
          position: relative;
          background: white;
          padding-bottom: 15/@size;
          padding-top: 15/@size;
          >.row-left{
            padding: 0 0.5rem;
            font-size: 16px;
            width: calc(100% - 56px);
          }
          >.row-right{
            font-size: 12px;
            color: white;
            width: 56px;
            background: @f_green;
            text-align: center;
            padding: 0.2rem 0;
            border-top-left-radius: 15px;
            -webkit-border-top-left-radius: 15px;
            -ms-border-top-left-radius: 15px;
            -moz-border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            -webkit-border-bottom-left-radius: 15px;
            -ms-border-bottom-left-radius: 15px;
            -moz-border-bottom-left-radius: 15px;
            >.iconfont{
              display: inline-block;
              padding-right: 2px;
            }
          }
        }
        /*优惠券*/
        >.profit{
          position: relative;
          font-size: 14px;
          padding: 0.52rem 0 0.52rem 10/@size;
          background: white;
          >.em{
            font-size: 14/@size;
            width: 75%;
            padding: 0;
            >.i{
              width: 56%;
              font-size: 14/@size;
              color: @f_red;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          >.row-right{
            font-size: 14/@size;
            top: 0;
            padding-right: 10/@size;
            >.iconfont{
              display:inline;
              font-size: 16/@size;
            }
          }
        }
    /*说明*/
        >.explain{
          font-size: 14px;
          position: relative;
          padding: 0.52rem 0.5rem;
          background: white;
          >.em{
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          >.p{
            margin-left: 15/@size;
            font-size: 14px;
            >.iconfont{
              margin-right: 3px;
              display: inline-block;
              width: 15px;
              height: 15px;
              border: 1px solid @f_green;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              color: @f_green;
              font-size: 12px;
              font-weight: 500;
              text-align: center;
              line-height: 13px;
            }
          }
        }
        >.sel{
          font-size: 14px;
          position: relative;
          padding: 0.52rem 0.5rem;
          background: white;
          margin: 0.25rem 0;
          >.row-left{
            font-size: 14px;
            width: 53.3%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
          }
          >.iconfont{
            font-size: 16px;
          }
        }
    /*地址*/
    >.address{
      position: relative;
      width: 100%;
      background: white;
      margin-bottom: 0.25rem;
      padding: 0 0.5rem;
      >.d2{
        padding: 0.4rem 0;
        >.row-left{
          font-size: 14px;
          width: 87%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
        }
        >.row-right{
          font-size: 16px;
        }
      }
      >.d1{
        position: relative;
        padding: 0.4rem 0;
        font-size: 14px;
      }
    }
    >.knock-plate{
      position: relative;
      background: white;
      margin-top: 0.25rem;
      >.row{
        padding: 0.75rem 10/@size 0.5rem 10/@size;
        >.row-left{
          font-size: 14px;
        }
        >.row-right{
          font-size: 14px;
          color: @f_green;
          >.iconfont{
            display: inline-block;
            margin-left: 2px;
            font-size: 14px;
          }
        }
        >.in_{
          color: @f_dgray;
        }
      }
      >.user-list{
        position: relative;
        padding: 0 10/@size;
        height: 109/@size;
        overflow: scroll;
        >.row{
          padding: 12/@size 0;
          >.p1{
            width: 30/@size;
            height: 30/@size;
            overflow: hidden;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            >.img{
              position: relative;
              width: 100%;
            }
          }
          >.p2{
            font-size: 14/@size;
            margin-top: 8/@size;
            margin-left: 4/@size;
          }
          >.p3{
            font-size: 16/@size;
            color: white;
            background: @f_red;
            padding: 2/@size 8/@size;
            margin-left: 10/@size;
            -webkit-border-radius: 15/@size;
            -moz-border-radius: 15/@size;
            border-radius: 15/@size;
            margin-top: 3/@size;
          }
          >.p4{
            >.i{
              display: block;
              font-size: 12/@size;
              color: @f_back;
            }
          }
        }
      }
    }
    /*第一页评价部分*/
    >.gds_comment{
      position: relative;
      margin-top: 0.25rem;
      background: white;
      width: 100%;
      >.row{
        padding: 0.75rem 10/@size 0.5rem 10/@size;
        >.row-left{
          font-size: 14px;
        }
        >.row-right{
          font-size: 14px;
          color: @f_green;
          >.iconfont{
            display: inline-block;
            margin-left: 2px;
            font-size: 14px;
          }
        }
        >.in_{
          color: @f_dgray;
        }
      }
      >.comment_item{
        position: relative;
        background: white;
        >.com_head{
          position: relative;
          padding: 0 10/@size;
          >.p{
            width: 31/@size;
            height: 31/@size;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            overflow: hidden;
            >.img{
              position: relative;
              width: 100%;
            }
          }
          >.i{
            font-size: 12/@size;
            margin: 8/@size 10/@size 0 4/@size;
            color: @f_gray;
          }
          >.em{
            font-size: 12/@size;
            border: 1px solid @f_green;
            color: @f_green;
            padding: 1/@size 10/@size;
            margin: 8/@size 8/@size;
            -webkit-border-radius: 10/@size;
            -moz-border-radius: 10/@size;
            border-radius: 10/@size;
          }
        }
        >.cm_text{
          position: relative;
          font-size: 14/@size;
          color: @f_back;
          padding: 4/@size 10/@size;
          height: 42/@size;
          background: white;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        >.cm_img{
          display: flex;
          display: -webkit-flex;
          position: relative;
          padding: 10/@size;
          justify-content: space-between;
          flex-wrap: wrap;
          >.p{
            position: relative;
            width: 116/@size;
            height: 116/@size;
            -webkit-border-radius: 5/@size;
            -moz-border-radius: 5/@size;
            border-radius: 5/@size;
            overflow: hidden;
            >.img{
              position: relative;
              width: 100%;
            }
          }
        }
      }
    }
    /*推荐*/
    >.commend_goods{
      position: relative;
      background: white;
      margin-top: 10/@size;
      >.title{
        position: relative;
        padding: 10/@size 0;
        font-size: 16/@size;
        text-align: center;
      }
      >.list_out{
        position: relative;
        width:100%;
        overflow: scroll;
        >.goods_list{
          position: relative;
          width: 100%;
          overflow-x: scroll;
          padding: 10/@size 0;
          >.row{
            >.row-left{
              width: 100/@size;
              margin-left: 10/@size;
              >.p1{
                position: relative;
                width: 100%;
                height: 100/@size;
                overflow: hidden;
                -webkit-border-radius: 5/@size;
                -moz-border-radius: 5/@size;
                border-radius: 5/@size;
                >.img{
                  position: relative;
                  width: 100%;
                }
              }
              >.p2{
                position: relative;
                width: 100%;
                height: 38/@size;
                overflow: hidden;
                font-size: 14/@size;
                margin: 6/@size 0;
              }
              >.p3{
                font-size: 14/@size;
                color: @f_red;
              }
            }
          }
        }
      }
    }
    /*详情*/
    >.gds_detail{
      position: relative;
      width: 100%;
      >.title{
        position: relative;
        font-size: 18px;
        text-align: center;
        padding: 10/@size;
        margin-top: 10/@size;
      }
      >.img{
        position: relative;
        width: 100%;
      }
    }
    >.bt-img{
      position: relative;
      width: 100%;
      margin: 10/@size 0;
      >.img{
        display: block;
        position: relative;
        width: 34.93%;
        margin: 0 auto;
      }
    }
  }
  #goods-info{
    background: @bg_color;
    z-index: 560;
    >.gds_comment{
      position: relative;
      background: white;
      margin-top: -65/@size;
      width: 100%;
      >.row{
        padding: 0.75rem 10/@size 0.5rem 10/@size;
        >.row-left{
          font-size: 14px;
          color: @f_back;
        }
        >.row-right{
          font-size: 14px;
          color: @f_green;
          >.iconfont{
            display: inline-block;
            margin-left: 2px;
            font-size: 14px;
          }
        }
        >.in_{
          color: @f_dgray;
        }
      }
      >.comment_item{
        position: relative;
        background: white;
        >.com_head{
          position: relative;
          padding: 0 10/@size;
          >.p{
            width: 31/@size;
            height: 31/@size;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            overflow: hidden;
            >.img{
              position: relative;
              width: 100%;
            }
          }
          >.i{
            font-size: 12/@size;
            margin: 8/@size 10/@size 0 4/@size;
            color: @f_gray;
          }
          >.em{
            font-size: 12/@size;
            border: 1px solid @f_green;
            color: @f_green;
            padding: 1/@size 10/@size;
            margin: 8/@size 8/@size;
            -webkit-border-radius: 10/@size;
            -moz-border-radius: 10/@size;
            border-radius: 10/@size;
          }
        }
        >.cm_text{
          position: relative;
          font-size: 14/@size;
          color: @f_back;
          padding: 4/@size 10/@size;
          margin-left: 0;
          left: 0;
          text-align: left;
          height: 42/@size;
          background: white;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        >.cm_img{
          display: flex;
          display: -webkit-flex;
          position: relative;
          padding: 10/@size;
          justify-content: space-between;
          flex-wrap: wrap;
          >.p{
            position: relative;
            width: 116/@size;
            height: 116/@size;
            -webkit-border-radius: 5/@size;
            -moz-border-radius: 5/@size;
            border-radius: 5/@size;
            overflow: hidden;
            >.img{
              position: relative;
              width: 100%;
            }
          }
        }
      }
    }
  }
  /*第3分页*/
#goods-last>.img{
  position: relative;
  width: 100%;
}

  #foot:after{content: "";display: block;clear: both;}
  #foot{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0 0.5rem;
    background: white;
    border-top: 1px solid @f_dgray;
    -webkit-transition: bottom 0.3s linear;
    -moz-transition: bottom 0.3s linear;
    -ms-transition: bottom 0.3s linear;
    -o-transition: bottom 0.3s linear;
    transition: bottom 0.3s linear;
    >.a{
      position: relative;
      width: 20%;
      float: left;
      text-align: center;
      height: 1.84rem;
      margin-top: 6/@size;
      line-height: 1.84rem;
      >.iconfont{
        font-size: 18px;
        display: inline;
        position: relative;
        text-align: center;
        padding: 2px;
        color: @f_gray;
      }
      >.in_{
        color: #ffdc48;
      }
      >.span{
        display: inline;
        color: black;
        position: relative;
        text-align: center;
        font-size: 14px;
        padding: 2px;
      }
    }
    >.b{
      margin: 5/@size 0;
      width: 54.8%;
      text-align: center;
      border-radius: 25px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 25px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      overflow: hidden;
      >.el-w-2{
        font-size: 0.84rem;
      }
      #add-car{
        border-top-left-radius:25px;
        border-bottom-left-radius: 25px;
      }
      #shop{
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      }
    }
    >.integral{
      font-size: 14px;
      background: @f_green;
      color: white;
      margin-top: 2/@size;

      padding: 6/@size 18/@size;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
    }
    >.knoc{
      width: 54.8%;
      margin-right: -10/@size;
      >.el-w-2{
        text-align: center;
        color: white;
        padding: 5/@size 0;
        font-size: 16/@size;
      }
      >.a{background:#ffa998;}
      >.b{background: #ff6445;}
    }
  }

  #add-car{
    display: block;
    background: linear-gradient(#5bebc8,#21d2a8);
    background: -webkit-linear-gradient(#5bebc8,#21d2a8);
    background: -o-linear-gradient(#5bebc8,#21d2a8);
    background: -moz-linear-gradient(#5bebc8,#21d2a8);
    background: -ms-linear-gradient(#5bebc8,#21d2a8);
    height: 1.84rem;
    line-height: 1.84rem;
    font-weight: 500;
    color: white;
  }
  #shop{
    background: @f_red;
    height: 1.84rem;
    line-height: 1.84rem;
    font-weight: 500;
    color: white;
  }

  /*底部弹出的提示*/
  #bottom-hint{
    position: fixed;
    width: 100%;
    background: white;
    z-index: 1600;
    bottom: -100%;
    -webkit-transition: bottom 0.3s linear;
    -moz-transition: bottom 0.3s linear;
    -ms-transition: bottom 0.3s linear;
    -o-transition: bottom 0.3s linear;
    transition: bottom 0.3s linear;
    border-top-left-radius: 10px;
    -webkit-border-top-left-radius: 10px;
    -moz-border-top-left-radius: 10px;
    -ms-border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    -moz-border-top-right-radius: 10px;
    -ms-border-top-right-radius: 10px;
    /*底部模块1*/
    >.plate1{
      position: relative;
      >.info{
        position: relative;
        width: 100%;
        padding: 1rem 20/@size 1.31rem 20/@size;
        >.info_in{
          width: 100%;
          >.le1{
            width: 37.3%;
            >.p{
              width: 100%;
              height: 90/@size;
              >.img{
                display: block;
                position: absolute;
                width: 100%;
                bottom: 0;
                left: 0;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
              }
            }
          }
          >.le2{
            width: 62.7%;
            padding-left: 40/@size;
            >.p1{
              position: relative;
              font-size: 18px;
              color: @f_red;
              >.i{
                display: inline;
                font-size: 14px;
              }
            }
            >.p2{
              position: relative;
              font-size: 14px;
              padding: 0.2rem 0;
            }
            >.p3{
              position: relative;
              font-size: 14px;
              white-space: normal;
            }
          }
        }
        >.sel_stand{
          position: relative;
          font-size: 16px;
          margin-top: 13/@size;
          color: @f_gray;
        }
        >.stand_list{
          position: relative;
          padding: 0.3rem 0;
          width: 100%;
          max-height: 200/@size;
          overflow-y: scroll;
          >.i{
            display: inline-block;
            position: relative;
            color: white;
            background: @b_gray;
            padding: 0.1rem 0.7rem;
            margin:0.26rem 0.52rem 0.26rem 0;
            font-size: 14px;
            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -ms-border-radius: 15px;
          }
          >.in_{
            color: white;
            background: @f_green;
          }
        }
        >.num{
          position: relative;
          margin-top: 1.5rem;
          >.row-left{
            font-size: 14px;
          }
          >.row-right{
            width: 5.2rem;
            border: 0.05rem solid @f_dgray;
            >.i{
              position: relative;
              width: 30%;
              font-size: 12px;
              text-align: center;
              padding: 2px 0;
            }
            >.b{
              position: relative;
              width: 40%;
              top: 0;
              font-weight: 500;
              font-size: 12px;
              border-left: 1px solid @f_dgray;
              border-right: 1px solid @f_dgray;
              text-align: center;
              padding: 2px 0;
            }
          }
        }
      }
      >.ability{
        width: 89.6%;
        margin: 0 auto 0.78rem auto;
        border-radius: 25px;
        -webkit-border-radius: 25px;
        -moz-border-radius: 25px;
        -ms-border-radius: 25px;
        overflow: hidden;
        >.left{
          font-size: 16px;
          color: white;
          text-align: center;
          padding: 0.36rem;
          background: linear-gradient(left,#5bebc8,#21d2a8);
          background: -webkit-linear-gradient(left,#5bebc8,#21d2a8);
          background: -o-linear-gradient(left,#5bebc8,#21d2a8);
          background: -moz-linear-gradient(left,#5bebc8,#21d2a8);
          background: -ms-linear-gradient(left,#5bebc8,#21d2a8);
        }
        >.right{
          font-size: 16px;
          color: white;
          text-align: center;
          padding: 0.36rem;
          background: @f_red;
        }
      }
      >.ability2{
        width: 89.6%;
        margin: 0 auto 0.78rem auto;
        text-align: center;
        color: white;
        font-size: 14px;
        padding: 0.36rem;
        border-radius: 25px;
        -webkit-border-radius: 25px;
        -moz-border-radius: 25px;
        -ms-border-radius: 25px;
        background: linear-gradient(left,#5bebc8,#21d2a8);
        background: -webkit-linear-gradient(left,#5bebc8,#21d2a8);
        background: -o-linear-gradient(left,#5bebc8,#21d2a8);
        background: -moz-linear-gradient(left,#5bebc8,#21d2a8);
        background: -ms-linear-gradient(left,#5bebc8,#21d2a8);
      }
    }
    /*底部模块2*/
    >.plate2{
      position: relative;
      width: 100%;
      padding-bottom: 1rem;
      >.title{
        font-size: 16/@size;
        text-align: center;
        padding: 1.25rem 0;
      }
      >.row{
        width: 100%;
        >.el-w-4{
          color: @f_back;
          >.img{
            position: relative;
            width: 58.66%;
            display: block;
            min-height: 2.7rem;
            margin: 0 auto;
          }
          >.p{
            position: relative;
            width: 100%;
            color: @f_back;
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
    >.plate3{
      position: relative;
      width: 100%;
      >.title{
        position: relative;
        font-size: 16/@size;
        text-align: center;
        padding: 0.5rem;
      }
      >.row{
        width: 97.06%;
        margin: 0.25rem auto;
        >.row-left{
          width: 66.9%;
          border-left: 1px solid @f_dgray;
          border-top: 1px solid @f_dgray;
          border-bottom: 1px solid @f_dgray;
          border-right: 1px dashed @f_gray;
          padding: 0.5rem;
          height: 4.55rem;
          border-radius: 5px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          >.row-left{
            width: 30%;
            >.p1{
              position: relative;
              font-size: 18/@size;
              color: @f_red;
              white-space: nowrap;
              overflow: hidden;
              >.i{
                font-size: 14/@size;
                display: inline;
              }
            }
            >.p2{
              font-size: 14/@size;
              color: @f_red;
              position: relative;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          >.row-right{
            width: 70%;
            font-size: 14/@size;
            color: black;
          }
          >.p3{
            position: relative;
            width: 100%;
            clear: both;
          }
          >.txt{
            position: relative;
            font-size: 14/@size;
            color: @f_gray;
            padding-top: 0.3rem;
          }
        }
        >.row-right{
          width: 33.1%;
          border-right: 1px solid @f_dgray;
          border-top: 1px solid @f_dgray;
          border-bottom: 1px solid darkgray;
          height: 4.55rem;
          overflow: hidden;
          border-radius: 5px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          >.img{
            position: absolute;
            z-index: 50;
            display: block;
            width: 4rem;
            height: 4rem;
            right: -0.5rem;
            top: -0.5rem;
          }
          >.p1{
            position: absolute;
            width: 3.35rem;
            padding: 0.2rem 0;
            font-size: 14/@size;
            background: @f_green;
            color: white;
            text-align: center;
            left: 50%;
            margin-left: -1.7rem;
            bottom: 0.5rem;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            z-index: 320;
          }
          >.p2{
            position: absolute;
            width: 3.35rem;
            padding: 0.2rem 0;
            font-size: 14/@size;
            background: @f_dgray;
            color: white;
            text-align: center;
            left: 50%;
            margin-left: -1.7rem;
            bottom: 0.5rem;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            z-index: 320;
          }
        }
      }
    }
    >.plate4{
      position: relative;
      >.title{
        position: relative;
        font-size: 16/@size;
        text-align: center;
        padding: 0.5rem;
      }
      >.content{
        position: relative;
        padding: 0 10/@size;
        height: 400/@size;
        overflow-y: scroll;
        >.txt{
          position: relative;
          font-size: 14/@size;
          margin-bottom: 28/@size;
          color: @f_gray;
        }
      }
    }
    /*叉叉按钮*/
    >.icon{
      position: absolute;
      width: 0.75rem;
      height: 0.75rem;
      right: 0.52rem;
      top: 0.52rem;
      padding: 0;
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
</style>
