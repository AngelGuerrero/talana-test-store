import Dashboard from '@/views/DashboardView.vue'
import CategoryView from '@/views/Products/CategoryView.vue'
import CartResumeView from '@/views/Cart/CartResumeView.vue'

const routes = [
  {
    path: '/',
    component: Dashboard
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path: '/category/:id',
    name: 'Categories',
    component: CategoryView
  },

  {
    path: '/my-cart',
    name: 'CartResume',
    component: CartResumeView
  },

  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/Errors/NotFound.vue')
  }
]

export { routes }
