import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './axios.config.js'
import utils from './utils/utils.js'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/site.css'
import Modal from './components/modal/index.js'
import SiteTable from './components/siteTable.vue'
Vue.prototype.$modal = Modal
Vue.component('site-table', SiteTable)
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
Vue.prototype.$utils = utils
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})