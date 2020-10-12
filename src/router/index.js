import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SwapPool from '@/pages/SwapPool'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/swap',
      name: 'Swap',
      component: SwapPool
    }
  ]
})
