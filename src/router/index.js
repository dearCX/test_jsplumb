import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Group from '@/components/Group'
import Example from '@/components/Example'
import Test from '@/components/Test'
import VueTest from '@/components/VueTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/example',
      name: 'Example',
      component: Example
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/vueTest',
      name: 'VueTest',
      component: VueTest
    }
  ]
})
