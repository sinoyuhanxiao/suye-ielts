<script setup lang="ts">
import { computed,ref } from 'vue'
import { ElMessage } from 'element-plus'
import { flashDecks } from '../data/lessonData'
import { useLearningStore } from '../stores/learning'
import type { Mastery,SectionId } from '../types'
const props=defineProps<{section:SectionId}>(),store=useLearningStore(),current=ref(-1),last=ref(-1),revealed=ref(false),mode=ref<'random'|'fixed'>('random')
const deck=computed(()=>flashDecks[props.section]||[]),card=computed(()=>deck.value[current.value])
function draw(){if(!deck.value.length)return;let i;do{i=Math.floor(Math.random()*deck.value.length)}while(deck.value.length>1&&i===last.value);last.value=i;current.value=i;revealed.value=false}
function selectQuestion(index:number){current.value=index;last.value=index;revealed.value=false}
function rate(level:Mastery){if(!card.value)return;store.rateQuestion(`${props.section}:${current.value}`,props.section,card.value[0],card.value[1],level);ElMessage.success(level===0?'已掌握':'已加入错题本');mode.value==='random'?draw():selectQuestion((current.value+1)%Math.min(10,deck.value.length))}
</script>
<template><el-card class="flash-card" shadow="never"><div class="quiz-mode"><div><el-tag size="small">主动回忆 · {{deck.length}} 题</el-tag><b>{{mode==='random'?'随机抽题':'固定选题'}}</b></div><el-radio-group v-model="mode" size="small"><el-radio-button value="random">随机模式</el-radio-button><el-radio-button value="fixed">固定模式</el-radio-button></el-radio-group></div><div v-if="mode==='fixed'" class="question-picker"><button v-for="(_,i) in deck.slice(0,10)" :class="{active:current===i,mastered:store.state.questions[`${section}:${i}`]?.level===0}" @click="selectQuestion(i)">{{i+1}}</button></div><h3><span v-if="card" class="question-number">第 {{current+1}} 题</span>{{card?.[0]||'选择模式并开始测试自己'}}</h3><div class="answer-box">{{revealed&&card?card[1]:'先在 20 秒内开口回答，再显示答案。'}}</div><div class="quiz-actions"><div><el-button v-if="mode==='random'" type="primary" @click="draw">随机出题</el-button><el-button v-else type="primary" :disabled="current<0" @click="selectQuestion((current+1)%Math.min(10,deck.length))">下一题</el-button><el-button @click="revealed=!!card">显示答案</el-button></div><el-button-group v-if="revealed"><el-button type="success" plain @click="rate(0)">会</el-button><el-button type="warning" plain @click="rate(1)">不确定</el-button><el-button type="danger" plain @click="rate(2)">不会</el-button></el-button-group></div></el-card></template>
