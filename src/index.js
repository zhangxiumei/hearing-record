import './accsets/scss/global.scss'
import Vue from 'vue'
import App from './app.vue'

import UiApp from '@/components/hearingRecord/index';
Vue.use(UiApp)
// import 'hearing-record/dist/css/hearing-record.css'
// import hearingRecord from 'hearing-record'

// Vue.use(hearingRecord)
const vm = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    },
    mounted() {
        console.log(this)
    }
})