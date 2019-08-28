import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from './App'
import ApiService from './api-service'
import store from './store'
import globalMixin from './mixins/global-mixin'

// Vue.config.errorHandler 对 Promise 无效, 别试了
// 全局错误提示
// ref: https://github.com/Meituan-Dianping/mpvue/issues/700#issuecomment-401511829
require('core-js/library/modules/_global.js').console = console

// vuex store 挂在 Vue 上, 这样在页面上 this.$store 使用
Vue.prototype.$store = store

// 后端 api  挂在 Vue 上, 这样在页面上 this.apiService 使用
Vue.prototype.$apiService = new ApiService()

// 全局 mixin
Vue.mixin(globalMixin)

Vue.config.productionTip = false
App.mpType = 'app'

// 在 mpvue 中使用 vue-router 兼容的路由写法
// ref: https://github.com/F-loat/mpvue-router-patch
Vue.use(MpvueRouterPatch)

const app = new Vue({ ...App, store })
app.$mount()
