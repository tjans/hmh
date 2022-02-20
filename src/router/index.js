import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Teams from '../views/Teams.vue'
import EditTeam from '../views/EditTeam.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/teams', name: 'Teams', component: Teams },
  { path: '/edit/team/:id', name: 'edit/team', component: EditTeam },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
