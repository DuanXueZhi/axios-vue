/**
 * 注册全局组件
 * */

import Vue from 'vue'
import BackTop from '../components/BackTop'
import AccountLogin from '@/components/AccountLogin'
import PhoneLogin from '@/components/PhoneLogin'

Vue.component('backTop', BackTop)
Vue.component('accountLogin', AccountLogin)
Vue.component('phoneLogin', PhoneLogin)
