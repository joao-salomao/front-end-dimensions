import Vue from 'vue'
import VueRouter from 'vue-router'
import QuestionList from '../views/Question/List'
import DimensionList from '../views/Dimension/List'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/question',
  },
  {
    path: '/question',
    name: 'QuestionList',
    component: QuestionList
  },
  {
    path: '/dimension',
    name: 'DimensionList',
    component: DimensionList
  },
]

const router = new VueRouter({
  routes
})

export default router
