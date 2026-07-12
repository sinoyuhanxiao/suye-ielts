<script setup lang="ts">
import { computed,nextTick,onMounted,ref,watch } from 'vue'
import { ElMessage } from 'element-plus'
import FlashQuiz from '../components/FlashQuiz.vue'
import SpeakingLab from '../components/SpeakingLab.vue'
import DrillPanel from '../components/DrillPanel.vue'
import WritingTemplates from '../components/WritingTemplates.vue'
import WritingSamples from '../components/WritingSamples.vue'
import { useLearningStore } from '../stores/learning'
import type { SectionId } from '../types'
const props=defineProps<{section:SectionId;title:string}>(),store=useLearningStore(),html=ref(''),contentRoot=ref<HTMLElement>()
const completed=computed(()=>!!store.state.sections[props.section])
async function load(){const template=document.getElementById('legacy-content') as HTMLTemplateElement|null;const source=template?.content.querySelector(`#${props.section}`)?.cloneNode(true) as HTMLElement|null;if(!source){html.value='';return}source.querySelectorAll('.quiz[data-flash],.lesson-head,.recorder').forEach(x=>x.remove());if(props.section==='vocab')source.querySelector('#vocabNext')?.closest('.quiz')?.remove();if(props.section==='speaking'){source.querySelector('#storyPresets')?.remove();source.querySelector('#buildStory')?.closest('.card')?.remove()}source.removeAttribute('id');html.value=source.innerHTML;await nextTick();wireLegacy()}
function wireLegacy(){const root=contentRoot.value;if(!root)return;root.querySelectorAll<HTMLElement>('[data-tabs]').forEach(group=>{const key=group.dataset.tabs,tabs=[...group.children] as HTMLElement[],panels=[...(root.querySelector(`[data-panels="${key}"]`)?.children||[])] as HTMLElement[];tabs.forEach((tab,i)=>tab.onclick=()=>{tabs.forEach(x=>x.classList.remove('active'));panels.forEach(x=>x.classList.remove('active'));tab.classList.add('active');panels[i]?.classList.add('active')})});root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(button=>button.onclick=()=>button.nextElementSibling?.classList.toggle('show'))}
function finish(){store.setSection(props.section,!completed.value);ElMessage.success(completed.value?'章节已完成':'已取消完成')}
onMounted(load);watch(()=>props.section,load)
</script>
<template><div class="page lesson-page"><header class="page-head"><div><el-tag>夙夜 IELTS · {{title}}</el-tag><h1>{{title}}</h1><p>先学习，再闭眼回忆；看完答案后判断自己会、不确定或不会。</p></div><el-button :type="completed?'success':'primary'" size="large" @click="finish">{{completed?'已完成 ✓':'完成本章'}}</el-button></header><el-steps :active="completed?4:2" finish-status="success" simple><el-step title="学习"/><el-step title="回忆"/><el-step title="测验"/><el-step title="重练"/></el-steps><SpeakingLab v-if="section==='speaking'"/><DrillPanel v-if="section==='drill'"/><article ref="contentRoot" class="legacy-content" v-html="html"/><WritingTemplates v-if="section==='letter'" kind="letter"/><WritingSamples v-if="section==='letter'" kind="letter"/><WritingTemplates v-if="section==='essay'" kind="essay"/><WritingSamples v-if="section==='essay'" kind="essay"/><FlashQuiz v-if="section!=='drill'" :section="section"/></div></template>
