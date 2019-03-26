import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './axios.config.js'
import utils from './utils/utils.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$utils = utils
console.log( utils )
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
