import Vue from 'vue'
import App from './App.vue'

import moment from 'moment'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import VueResource from 'vue-resource'
Vue.use(VueResource);

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo }}</li>'
})

new Vue({
  el: '#app',
  methods: {
  },
  data: {
  }, 
  render: h => h(App)
})  

