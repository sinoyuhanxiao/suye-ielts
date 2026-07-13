import { createRouter,createWebHashHistory,createWebHistory } from 'vue-router'
import DashboardPage from './views/DashboardPage.vue'
import LessonPage from './views/LessonPage.vue'

const lessons=[
  ['grammar','grammar','高回报句式'],['linking','linking','连接词'],['vocabulary','vocab','高频替换词'],['speaking','speaking','口语故事'],['letter','letter','G 类书信'],['essay','essay','大作文'],['drill','drill','综合模拟']
] as const
const history=import.meta.env.VITE_ROUTER_MODE==='hash'
  ? createWebHashHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL)

export default createRouter({history,scrollBehavior:()=>({top:0}),routes:[
  {path:'/',name:'dashboard',component:DashboardPage},
  ...lessons.map(([path,section,title])=>({path:`/${path}`,name:path,component:LessonPage,props:{section,title}})),
  {path:'/:pathMatch(.*)*',redirect:'/'}
]})
