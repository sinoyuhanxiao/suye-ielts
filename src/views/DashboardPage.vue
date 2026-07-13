<script setup lang="ts">
import { computed,onBeforeUnmount,ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLearningStore } from '../stores/learning'
const store=useLearningStore(),router=useRouter(),seconds=ref(1500);let timer:number|undefined
const profilePicture=`${import.meta.env.BASE_URL}profile.webp`
const clock=computed(()=>`${String(Math.floor(seconds.value/60)).padStart(2,'0')}:${String(seconds.value%60).padStart(2,'0')}`)
const routeBySection={grammar:'/grammar',linking:'/linking',vocab:'/vocabulary',speaking:'/speaking',letter:'/letter',essay:'/essay',drill:'/drill'} as const
const next=computed(()=>store.sectionIds.find(x=>!store.state.sections[x])||'drill')
function start(){if(!timer)timer=window.setInterval(()=>{if(seconds.value>0)seconds.value--;else{clearInterval(timer);timer=undefined}},1000);router.push(routeBySection[next.value])}
onBeforeUnmount(()=>clearInterval(timer))
</script>
<template><div class="page dashboard-page"><section class="welcome"><div class="welcome-identity"><el-avatar :size="132" :src="profilePicture"/><div><el-tag effect="dark">SUYE · 6.5 SPRINT</el-tag><h1>夙夜 IELTS 学习舱</h1><p>少背一点，稳定多拿分。学习 → 回忆 → 测验 → 只重练错题。</p><el-button type="primary" size="large" @click="start">开始 25 分钟冲刺</el-button></div></div><div class="clock">{{clock}}</div></section><div class="stat-grid"><el-card><small>掌握度</small><strong>{{store.mastery}}%</strong><el-progress :percentage="store.mastery" color="#7ca99a"/></el-card><el-card><small>完成章节</small><strong>{{store.completed}}/7</strong></el-card><el-card><small>待重测</small><strong>{{store.mistakes.length}}</strong></el-card></div><el-alert title="下一步" :description="`继续完成 ${next}，看完答案后再判断会、不确定或不会。`" type="success" :closable="false" show-icon/></div></template>
