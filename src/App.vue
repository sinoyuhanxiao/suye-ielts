<script setup lang="ts">
import { computed,ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useLearningStore } from './stores/learning'
const store=useLearningStore(),route=useRoute(),router=useRouter(),drawer=ref(false)
const profilePicture=`${import.meta.env.BASE_URL}profile.webp`
const nav=[['/','今日冲刺'],['/grammar','高回报句式'],['/linking','连接词'],['/vocabulary','高频替换'],['/speaking','口语故事'],['/letter','G 类书信'],['/essay','大作文'],['/drill','综合模拟']]
const active=computed(()=>route.path)
async function reset(){await ElMessageBox.confirm('确定清除全部学习记录吗？','重置记录',{type:'warning'});store.reset()}
</script>
<template><el-container class="app-shell"><el-aside class="desktop-aside" width="224px"><div class="brand"><el-avatar :size="48" :src="profilePicture"/><div><span>夙夜</span> IELTS<small>学习舱</small></div></div><el-menu router :default-active="active"><el-menu-item v-for="([path,label],i) in nav" :key="path" :index="path"><span class="nav-index">{{String(i).padStart(2,'0')}}</span>{{label}}</el-menu-item></el-menu><div class="aside-progress"><small>总掌握度</small><strong>{{store.mastery}}%</strong><el-progress :percentage="store.mastery" :show-text="false" color="#7ca99a"/><el-button link @click="drawer=true">错题本 {{store.mistakes.length}} →</el-button></div></el-aside><el-main><div class="mobile-profile"><el-avatar :size="36" :src="profilePicture"/><b>夙夜 IELTS 学习舱</b></div><router-view/></el-main></el-container>
<nav class="mobile-nav" aria-label="全部学习章节"><button v-for="([path,label]) in nav" :key="path" :class="{active:active===path}" @click="router.push(path)">{{label}}</button></nav>
<el-drawer v-model="drawer" title="错题本" size="min(420px,90vw)"><el-empty v-if="!store.mistakes.length" description="目前没有错题"/><el-card v-for="item in store.mistakes" :key="item.key" class="mistake"><el-tag size="small">{{item.section}}</el-tag><h4>{{item.question}}</h4><p>{{item.answer}}</p></el-card><el-button type="danger" plain @click="reset">重置全部记录</el-button></el-drawer></template>
