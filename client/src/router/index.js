import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/Users'
import NewUser from '@/components/NewUser'
import EditUser from '@/components/EditUser'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/users/new',
      name: 'NewUser',
      component: NewUser
    },
    {
      path: '/users/:id',
      name: 'EditUser',
      component: EditUser
    }
  ]
})
