<script setup lang="ts">
import { computed,onBeforeUnmount,ref } from 'vue'
import { useLearningStore } from '../stores/learning'
const store=useLearningStore(),index=ref(0),chosen=ref(-1),seconds=ref(60),phase=ref<'prepare'|'speak'|'done'>('prepare');let timer:number|undefined
const questions=[
['陌生租房中介投诉信用什么语气？',['Informal','Formal','随便'],1,'陌生机构使用 Formal。'],
['直属经理请假用什么语气？',['Semi-formal','Informal','极度正式'],0,'认识但有职业距离，使用 Semi-formal。'],
['哪一句正确？',['Although it is cheap, but...','Although it is cheap, it is...','Despite it is cheap...'],1,'Although 不与 but 同时使用。'],
['Task 2 主体段最稳顺序？',['高级词→数据','观点→原因→例子→回扣','多个浅观点'],1,'一个中心观点充分展开。'],
['哪项修饰不可数 time？',['numerous time','a great deal of time','many time'],1,'a great deal of + 不可数。'],
['outweigh 题必须做什么？',['只列两边','明确哪边更大','只写优点'],1,'必须比较并明确判断。'],
['朋友邀请信结尾？',['Yours faithfully','Best wishes','To whom it may concern'],1,'朋友用 Best wishes。'],
['自然搭配是哪一个？',['make a crime','do a call','address a problem'],2,'address a problem。'],
['PREP 的 R 是？',['Repeat','Reason','Remember'],1,'Point → Reason → Example → Point。'],
['Why...? What effects...? 如何分段？',['支持/反对','原因/影响','只写影响'],1,'每个主体段回答一个问题。']
] as const
const q=computed(()=>questions[index.value]),clock=computed(()=>`${String(Math.floor(seconds.value/60)).padStart(2,'0')}:${String(seconds.value%60).padStart(2,'0')}`)
function answer(i:number){chosen.value=i;store.rateQuestion(`drill:${index.value}`,'drill',q.value[0],q.value[3],i===q.value[2]?0:2)}
function next(){index.value=(index.value+1)%questions.length;chosen.value=-1}
function start(){if(timer)return;timer=window.setInterval(()=>{seconds.value--;if(seconds.value<=0){if(phase.value==='prepare'){phase.value='speak';seconds.value=120}else{phase.value='done';clearInterval(timer);timer=undefined}}},1000)}
function reset(){clearInterval(timer);timer=undefined;phase.value='prepare';seconds.value=60}
onBeforeUnmount(()=>clearInterval(timer))
</script>
<template><div class="drill-grid"><el-card shadow="never"><el-tag>综合题 {{index+1}}/{{questions.length}}</el-tag><h3>{{q[0]}}</h3><el-space direction="vertical" fill style="width:100%"><el-button v-for="(option,i) in q[1]" :type="chosen===i?(i===q[2]?'success':'danger'):''" @click="answer(i)">{{option}}</el-button></el-space><el-alert v-if="chosen>=0" :title="q[3]" :type="chosen===q[2]?'success':'error'" :closable="false"/><el-button class="next-question-button" link @click="next">下一题 →</el-button></el-card><el-card class="timer-card" shadow="never"><small>{{phase==='prepare'?'准备 1 分钟':phase==='speak'?'回答 2 分钟':'完成'}}</small><strong>{{clock}}</strong><el-button type="primary" @click="start">开始</el-button><el-button @click="reset">重置</el-button></el-card></div></template>
