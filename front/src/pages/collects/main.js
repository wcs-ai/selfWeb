import Vue from 'vue'
import App from './index'

const app = new Vue(App);
app.$mount();
export default{
  config:{
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '登录',
    navigationBarTextStyle: 'black'
  }
}
