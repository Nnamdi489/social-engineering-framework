import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@views/Home.vue'
import ResearchFramework from '@views/ResearchFramework.vue'
import SimulationDashboard from '@views/SimulationDashboard.vue'
import AttackSimulator from '@views/AttackSimulator.vue'
import DetectionCenter from '@views/DetectionCenter.vue'
import AnalyticsDashboard from '@views/AnalyticsDashboard.vue'
import Documentation from '@views/Documentation.vue'
import DefenseTraining from '@views/DefenseTraining.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home - Social Engineering Research Framework' }
  },
  {
    path: '/research',
    name: 'ResearchFramework',
    component: ResearchFramework,
    meta: { title: 'Research Framework' }
  },
  {
    path: '/simulation',
    name: 'SimulationDashboard',
    component: SimulationDashboard,
    meta: { title: 'Simulation Dashboard' }
  },
  {
    path: '/attacks',
    name: 'AttackSimulator',
    component: AttackSimulator,
    meta: { title: 'Attack Simulator' }
  },
  {
    path: '/detection',
    name: 'DetectionCenter',
    component: DetectionCenter,
    meta: { title: 'Detection Center' }
  },
  {
    path: '/analytics',
    name: 'AnalyticsDashboard',
    component: AnalyticsDashboard,
    meta: { title: 'Analytics & Results' }
  },
  {
    path: '/docs',
  name: 'Documentation',
  component: Documentation,
  meta: { title: 'Documentation' }
  },
  {
    path: '/defense',
    name: 'DefenseTraining',
    component: DefenseTraining,
    meta: { title: 'Defense Training' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title || 'Social Engineering Research Framework'
  next()
})

export default router
