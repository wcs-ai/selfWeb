var domin_ = 'https://api.wzq998.com';
//var domin_ = 'http://test.wangziqing.com';
var img_url = 'https://api.wzq998.com/Forestproducts/public/static/api/img/';
var urls = {
    //首页,host.js
    index:{
        //row:72
        hostDatURL:domin_.concat('/api/index/index'),
        //row:203
        wordsDatURL:domin_.concat('/api2/v1.goods/search'),
        //row:298
        searchDatURL:domin_.concat('/api2/v1.goods/lists'),
        //签到数据获取
        siginGetURL:domin_.concat('/api/sign/index'),
        //签到
        signURL:domin_.concat('/api/sign/add'),
        //马蹄金兑换页获取信息
        getGralURL:domin_.concat('/api/integral/exchange_info'),
      //兑换
        exchangeURL:domin_.concat('/api/integral/exchange'),
      //赶马之窗视频列表S
        videoListURL:domin_.concat('/api/article/lists'),
        //包邮
        promoptURL:domin_.concat('/api/activity/lists'),
      //排行榜
        rankListURL:domin_.concat('/api/index/ranking_list'),
      //消息通知数量
        infoNumURL:domin_.concat('/api/notice/count'),
      //购物车数量
        cartNumURL:domin_.concat('/api/carts/count'),
      //拼团列表
        knockListURL:domin_.concat('/api/unionbuy/lists')
    },
    //分类页,class.js
    class:{
        //row:19
        listDatURL:domin_.concat('/api/goods/category'),
        //row:69
        goodsDatURL:domin_.concat('/api/goods/lists'),
        //三级分类页获取数据
        thirdURL:domin_.concat('/api/goods/lists'),
      // 品牌页
        brandListURL:domin_.concat('/api/brand/detail'),
      //品牌收藏
        collectURL:domin_.concat('/api/collection/add')
    },
    // 商品详情页,pDetail.js
    pDetail:{
        // row:69
       goodsInfoDatURL:domin_.concat('/api/goods/detail'),
       // row:148
       addCartURL:domin_.concat('/api/carts/add'),
       // row:181
       collectURL:domin_.concat('/api/goods/collect'),
       // row:237
       subFormURL:domin_.concat('/api/carts/buynow'),
      //领取优惠券
       getCoupnURL:domin_.concat('/goods/receive_coupon'),
      //评价页标签
        cmTagURL:domin_.concat('/api/comments/tag'),
      //comment list url
        cmListURL:domin_.concat('/api/comments/index'),
      //点赞
        praiseURL:domin_.concat('/api/comments/love'),
      //write comment page,get form info
        cmgdURL:domin_.concat('/api/comments/detail'),
      //publish comment
        publishCURL:domin_.concat('/api/comments/add'),
      //look knock people
        lookKnockURL:domin_.concat('/api/unionbuy/detail')

    },
    // 购物车,cart.js
    cart:{
        //row:56
        goodsDatURL:domin_.concat('/api/carts/index'),
        //row:197
        updataURL:domin_.concat('/api/carts/add'),
        //row:340
        deleteURL:domin_.concat('/api/carts/del'),
        //row:381
        buyURL:domin_.concat('/api/carts/edit')
    },
    // 个人中心,self.js
    self:{
        //row:61
        selfInfoURL:domin_.concat('/api/member/index'),
        //修改头像
        photoURL:domin_.concat('/api/uploadfile/avatar'),
        //个人信息页获取
        userInfoURL:domin_.concat('/api/member/personal_info'),
        //实名认证列表
        realListURL:domin_.concat('/api/profile/index'),
      //获取实名认证信息
        realDetailURL:domin_.concat('/api/profile/index'),
        //实名认证提交
        realOpURL:domin_.concat('/api/profile/auth'),
      //删除实名认证
        deleteRealURL:domin_.concat('/api/profile/del'),
      //取消收藏店铺、品牌
        cancelURL:domin_.concat('/api/collection/add'),
      //修改个人信息
        alterInfoURL:domin_.concat('/api/member/update_info'),
      //获取备案号
        getWordURL:domin_.concat('/api/index/config')
    },
    //特殊分类，特殊商品,super.js
    supers:{
        //赶马之宝、新品上架
        superGoodsURL:domin_.concat('/api/activity/lists'),
      //新品上架
        newGoodsURL:domin_.concat('/api/activity/newgoodslists'),
        //row:64
        superSubURL:domin_.concat('/api2/v1.carts/buynow')
    },
    // 地址页,add.js
    address:{
        //row:22
        getaddURL:domin_.concat('/api/address/index'),
        //row:131,修改默认地址
        alterDefaultAddressURL:domin_.concat('/api/address/setdef'),
        //row:158
        deleteAddressURL:domin_.concat('/api/address/del'),
        //row:223,新增地址
        addAddressURL:domin_.concat('/api/address/add'),
        // row:227,编辑地址信息
        compileAddressURL:domin_.concat('/api/address/edit'),
      //地址详细信息
        addDetailURL:domin_.concat('/api/address/detail')
    },
    // 登录注册页,loginAregist.js
    loginAndup:{
        // row:55
        getVerifiURL:domin_.concat('/api2/common/sendsms'),
        // row:143,注册
        logUPURL:domin_.concat('/api2/v1.member/register'),
        // row:212
        logInURL:domin_.concat('/api2/v1.member/login')
    },
    // 忘记密码页,forgetPass.js
    forgetPass:{
        //row:28
        getVerifiURL:domin_.concat('/api2/common/sendsms'),
        //row:79
        alterPassURL:domin_.concat('/api2/v1.member/changepwd')
    },
    // 个人中心订单页,goodsForm.js
    goodsForm:{
        //row:49
        loadFormURL:domin_.concat('/api/order/index'),
        //row:106
        cancelFormURL:domin_.concat('/api/order/cancel'),
        //删除订单
        delFormURL:domin_.concat('/api/order/del'),
        //确认收货
        sureAcceptURL:domin_.concat('/api/order/confirm')
    },
    // 订单详情页,formDetail.js
    formDetail:{
        // row:86
        formInfoURL:domin_.concat('/api/order/detail'),
        //row:122
        cancelFormURL:domin_.concat('/api/order/cancel'),
        //row:153
        sureAcceptURL:domin_.concat('/api/order/confirm'),
        //row:178
        lookLogitURL:domin_.concat('/api/order/traces'),
        //退款订单列表
        backListURL:domin_.concat('/api/order/refund_list'),
        //退款订单详情
        backDetailURL:domin_.concat('/api/order/refundinfo'),
        //退款
        backMoneyURL:domin_.concat('/api/order/refund'),
        //撤销退款
        cancelBackURL:domin_.concat('/api/order/refund_undo'),
        //物流详情
        logiticURL:domin_.concat('/api/order/traces')
    },
    // 退款售后申请页,afterSale.js
    afterSale:{
        //row:12
        getFormInfoURL:domin_.concat('/api2/v1.order/refundinfo'),
        //row:
        subImgURL:domin_.concat('/api2/v1.order/refund')
    },
    // 确认订单页,subFomr.js
    subForm:{
        //row:57
        getFormDetailURL:domin_.concat('/api/carts/check'),
        //row:105
        toPayURL:domin_.concat('/api/order/add')
    },
    // 支付页
    pay:{
        //row:9
        getFormInfoURL:domin_.concat('/api/order/payinfo'),
        //row:35
        wxPayURL:domin_.concat('/api/wxxcx/xcxpay'),
        h5PayURL:domin_.concat('/api/wxpay/h5pay')
    },
    // 个人收藏页save.js
    save:{
        //row:18
        loadSaveDatURL:domin_.concat('/api/collection/index'),
        //商品取消
        cancelSaveURL:domin_.concat('/api/goods/collect'),
      //品牌取消
    },
    // 信息通知页,selfInform.js
    message:{
      //消息通知类别
        getMessageURL:domin_.concat('/api/notice/type'),
        //按类别获取对应消息列表
        getInfoListURL:domin_.concat('/api/notice/index'),
      //消息详情
        infoDetailURL:domin_.concat('/api/notice/detail')
    },
    // 他的店铺搜索页,searchStore.js
    searchStore:{
        //row:25
        hotWordsURL:domin_.concat('/api/store/search'),
        //row:60
        resultURL:domin_.concat('/api/store/lists')
    },
    // 他的店铺收藏页,hisHost.js
    hisHost:{
        //row:24
        loadStoreDatURL:domin_.concat('/api/store/detail'),
        //row:71
        saveURL:domin_.concat('/api2/v1.collection/add'),
      //分类列表
        classURL:domin_.concat('/api/storegoods/category'),
      //分类列表商品
        classGoodsURL:domin_.concat('/api/storegoods/lists')
    },
    // 客服中心页,server.js
    server:{
        //row:22
        problemListURL:domin_.concat('/api2/v1.article/help'),
        //row:48
        detailProblemURL:domin_.concat('/api2/v1.article/lists'),
        //row:77
        problemContentURL:domin_.concat('/api2/v1.article/detail'),
        //row:99
        subFadeBackURL:domin_.concat('/api2/v1.feedback/add')
    },
    // app下载页
    download:{
        downloadURL:domin_.concat('/api2/v1.appupdate/index')
    },
    // 个人店铺,selfStore.js
    selfStore:{
        //row:24
        storeInfoURL:domin_.concat('/api/store/index'),
        //row:225
        photoURL:domin_.concat('/api2/v1.uploadfile/store_avatar'),
      //本月销售
        monthSellURL:domin_.concat('/api/storeorder/sales_month'),
      //销售查询明细
        sellDetailURL:domin_.concat('/api/storeorder/sale_orderlists'),
      //申请开店查看信息
        lookAplyStoreURL:domin_.concat('/api/store/applyinfo'),
      //撤销申请开店
        avocateURL:domin_.concat('/api/store/delete'),
      //申请开店
        applyStoreURL:domin_.concat('/api/store/apply'),
      //文章详情
        atcDetailURL:domin_.concat('/api/article/detail'),
    },
    // 店铺管理页
    mannageStore:{
        uploadURL:domin_.concat('/api/store/edit')
    },
    // 店铺商品首页,storeHost.js
    storeHost:{
        //row:18
        classListURL:domin_.concat('/api2/v1.storegoods/category'),
        //row:60
        getProductsURL:domin_.concat('/api2/v1.storegoods/lists')
    },
    // 余额页,surplusMoney.js
    surplusMoney:{
        getMoneyURL:domin_.concat('/api/store/money')
    },
    // 提现页,deposit.js
    deposit:{
        //申请提现页查看信息
        getUserInfoURL:domin_.concat('/api/store/cash_account'),
        //添加提现账号
        createCountURL:domin_.concat('/api/store/add_cash_account'),
        //申请提现
        depositURL:domin_.concat('/api/store/cash'),
        //提现记录
        depositCoardURL:domin_.concat('/api/store/cashlist'),
        //提现进度
        depositStatusURL:domin_.concat('/api/store/cashdetail'),
      //查看已提现明细
        depositDetailURL:domin_.concat('/api/store/cashedlist')
    },
    // 个人佣金页,brokerageDetail.js
    brokeRage:{
        loadGoodsURL:domin_.concat('/api/storeorder/orderlist'),
    },
    // 区域分红页,profit.js
    profit:{
        infoURL:domin_.concat('/api/storeorder/area_order'),
      //查询区域分红明细
        searchURL:domin_.concat('/api/storeorder/area_orderlists')
    },
    // 活动相关页面
    activity:{
        subPhoneURL:domin_.concat('/api2/v1.member/invite'),
        //videoList.html
        vListURL:domin_.concat('/api2/v1.article/lists'),
        //videoDetail.html
        vDetailURL:domin_.concat('/api2/v1.article/detail')
    },
    //积分相关接口
    integral:{
        //积分首页
        storeURL:domin_.concat('/api/integral/index'),
        //积分明细
        detailURL:domin_.concat('/api/member/integral'),
        //赚取更多积分
        getURL:domin_.concat('/api/integral/getway'),
        //积分规则
        ruleURL:domin_.concat('/api/integral/rule'),
      //文章详情，积分规则详细
        articleURL:domin_.concat('/api/article/detail')
    },
    //优惠劵相关接口
    privilege:{
        //myself privilege
        hostURL:domin_.concat('/api/member/coupon'),
        //领券中心
        centerURL:domin_.concat('/api/goods/info_coupon'),
        //privilegeCneter.html>row:101
        drapPrgURL:domin_.concat('/api2/v1.coupon/receive')
    },
    //代理商登录页
    pcphAgent:{
        //AgentLogin.html>row:56
        loginURL:domin_.concat('/api2/v1.store/login'),
        //AgentInquire.html>row:103
        searchURL:domin_.concat('/api2/v1.store/check')
    },
    //查询地址下的地址
    searchAdd:{
        addURL:domin_.concat('/api2/common/get_area')
    },
		//每月
		monthlySpecial:{
			// 特价日期列表日期
			daysURL: domin_.concat('/api/promotion/days'),
			// 对应特价日商品列表
			goodsURL: domin_.concat('/api/promotion/lists'),
			// 提醒列表
			remindURL: domin_.concat('/api/warn/index'),
      //set remaind
      setRemindURL:domin_.concat('/api/warn/add')
		}
};
var img = {
  self_banner:img_url.concat('self_back.png'),
  hisStore_banner:img_url.concat('hisStore_banner.png'),
  self_head:img_url.concat('self_head.png'),
  form_emptty:img_url.concat('empty.png'),
  about_ban1:img_url.concat('about_ban1.png'),
  about_ban2:img_url.concat('about_ban2.png'),
  about_bt:img_url.concat('about_bt.png'),
  about_cont:img_url.concat('about_cont.png'),
  form_accpet:img_url.concat('form_accpet.png'),
  form_comment:img_url.concat('form_comment.png'),
  form_pay:img_url.concat('form_pay.png'),
  form_send:img_url.concat('form_send.png'),
  brand_banner:img_url.concat('brand_banner.png'),
  real_award:img_url.concat('real_award.png'),
  real_back:img_url.concat('real_back.png'),
  self_approve:img_url.concat('self_approve.png'),
  integral_ruler_banner:img_url.concat('integral_ruler_banner.png'),
  selfStore_banner:img_url.concat('selfStore_banner.png'),
  qyfh_banner:img_url.concat('qyfh_banner.png'),
  sign_banner:img_url.concat('sign_banner.png'),
  sign_gray1:img_url.concat('sign_gray1.png'),
  sign_gray2:img_url.concat('sign_gray2.png'),
  sign_light:img_url.concat('sign_light.png'),
  sign_quan_light:img_url.concat('sign_quan_light.png'),
  sign_gray3:img_url.concat('sign_gray3.png'),
  sign_light3:img_url.concat('sign_light3.png'),
  collect_empty:img_url.concat('collect_empty.png'),
  info_empty:img_url.concat('info_empty.png'),
  none_search:img_url.concat('none_search.png'),
  newGoods_banner:img_url.concat('newGoods_banner.png'),
  download_android:img_url.concat('download_android.png'),
  download_bottom:img_url.concat('download_bottom.png'),
  download_ios:img_url.concat('download_ios.png'),
  download_top:img_url.concat('download_top.png'),
  download_yyb:img_url.concat('download_yyb.png'),
  common_empty:img_url.concat('common_empty.png'),
  cart_empty:img_url.concat('cart_empty.png'),
  exchange_banner:img_url.concat('exchange_banner.png'),
  blance_banner:img_url.concat('blance_banner.png'),
  login_logo:img_url.concat('login_logo.png'),
  logo:img_url.concat('logo.png'),
  get_empty:img_url.concat('get_empty.jpg'),
  get_finish:img_url.concat('get_finish.jpg'),
  take_ed:img_url.concat('take_ed.png'),
  take_out:img_url.concat('take_out.png'),
  selfStore_qyfh:img_url.concat('selfStore_qyfh.png'),
  selfStore_yjlr:img_url.concat('selfStore_yjlr.png'),
  selfStore_host:img_url.concat('selfStore_host.png'),
  selfStore_share:img_url.concat('selfStore_share.png'),
  share_qq:img_url.concat('share_qq.png'),
  share_qqSpace:img_url.concat('share_qqSpace.png'),
  share_url:img_url.concat('share_url.png'),
  share_xl:img_url.concat('share_xl.png'),
  open_app_hint:img_url.concat('open_app_hint.png'),
  share_wx:img_url.concat('share_wx.png'),
  knock_banner:img_url.concat('knock_banner.png'),
  cmSuccess_mark:img_url.concat('cmSuccess_mark.png'),
  collect_promopt:img_url.concat('collect_promopt.png'),
  collect_knock:img_url.concat('collect_knock.png'),
  home_go:img_url.concat('home_go.png'),
  home_promotion:img_url.concat('home_promotion.png'),
  ic_tejia_jieshu:img_url.concat('ic_tejia_jieshu.png'),
  img_tixing_empty:img_url.concat('img_tixing_empty.png'),
  nav_tejia_bg:img_url.concat('nav_tejia_bg.png')
};

export default {
  domin_,
  img,
  urls
}
