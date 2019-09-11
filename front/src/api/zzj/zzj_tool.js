import Vue from "vue";
let $this;
export default {
    imgurl:'http://test.wangziqing.com/uploads/ui/',
    res: 'http://test.wangziqing.com/api/Pscoreshop/index',
    setup() {
        $this = new Vue();
    },
    /**
     *
     * @param {商品ID} id 获取商品详情页链接
     *
     */
    getDeUrl(id) {
        return '../pages/pDetail/main?integral=true&pid=' + id + '&token=' + this.token;
    },
    async post(url, data, type = 'post') {
        return new Promise(ok => {
            $this.request({
                method: type,
                url: url,
                data: data,
                success: res => {
                    //res = res.data.status ? res.data.data : res.data;
                  var res_;
                  if(res.statusCode){res_ = res.data;}
                  else{res_ = res;}
                    ok(res_);
                }
            })
        });
    },
    get token() {
        let token;
        try {
            token = $this.get_token();
        } catch (e) {

        }
        if (!token) {
            token = 'c30fe3b7a866a417488b902334076ba9104521b5';
        }
        return token;
    },
    backPage() {
        try {
            wx.navigateBack();
        } catch (e) {
            window.history.go(-1)
        }
    }
}
