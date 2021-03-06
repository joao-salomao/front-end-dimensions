import Vue from 'vue'
import VueRouter from 'vue-router'
import QuestionList from '../views/Question/List'
import QuestionBase from '../views/Question/QuestionBase'
import NewQuestion from '../views/Question/New'
import EditQuestion from '../views/Question/Edit'
import NewDimension from '../views/Dimension/New'
import EditDimension from '../views/Dimension/Edit'
import DimensionList from '../views/Dimension/List'
import DimensionBase from '../views/Dimension/DimensionBase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/question',
  },
  {
    path: '/question',
    name: 'QuestionBase',
    component: QuestionBase,
    redirect: '/question/list',
    children: [
      {
        path: 'list',
        name: 'QuestionList',
        component: QuestionList
      },
      {
        path: 'new',
        name: 'NewQuestion',
        component: NewQuestion
      },
      {
        path: 'edit/:id',
        name: 'EditQuestion',
        component: EditQuestion
      },
    ]
  },
  {
    path: '/dimension',
    name: 'DimensionBase',
    component: DimensionBase,
    redirect: '/dimension/list',
    children: [
      {
        path: 'list',
        name: 'DimensionList',
        component: DimensionList,
      },
      {
        path: 'new',
        name: 'DimensionNew',
        component: NewDimension
      },
      {
        path: 'edit/:id',
        name: 'DimensionEdit',
        component: EditDimension
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
