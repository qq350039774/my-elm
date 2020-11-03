import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import routes from './router/router'
import VueLazyload from 'vue-lazyload'
//import Skeleton from './Skeleton.vue'

Vue.use(VueRouter)
Vue.use(VueLazyload, {
  preLoad: 1.3, // 提前加载高度（数字 1 表示 1 屏的高度） 默认值:1.3
  error: require('./assets/logo.png'), // 当加载图片失败的时候
  loading: require('./assets/logo.png'), // 图片加载状态下显示的图片
  attempt: 3 //  加载错误后最大尝试次数 默认值:3
})
const router = new VueRouter({
	routes
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  //Skeleton,
  render: h => h(App)
}).$mount('#app')
