import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { LearningState, Mastery, Mistake, SectionId, SpeakingReview } from '../types'

const KEY='ieltsCockpitV2'
const blank=():LearningState=>({version:3,sections:{},questions:{},mistakes:[],speakingReviews:[],checklist:[]})
function load():LearningState{
  try{
    const old=JSON.parse(localStorage.getItem(KEY)||'{}')
    const legacy=JSON.parse(localStorage.getItem('ieltsChecks')||'[]')
    return {...blank(),...old,version:3,checklist:old.checklist?.length?old.checklist:legacy}
  }catch{return blank()}
}
export const useLearningStore=defineStore('learning',()=>{
  const state=ref<LearningState>(load())
  const sectionIds:SectionId[]=['grammar','linking','vocab','speaking','letter','essay','drill']
  const completed=computed(()=>sectionIds.filter(id=>state.value.sections[id]).length)
  const mastery=computed(()=>{const values=Object.values(state.value.questions);return values.length?Math.round(values.filter(x=>x.level===0).length/values.length*100):Math.round(completed.value/7*100)})
  const mistakes=computed(()=>state.value.mistakes)
  function setSection(id:SectionId,value:boolean){state.value.sections[id]=value}
  function rateQuestion(key:string,section:SectionId,question:string,answer:string,level:Mastery){state.value.questions[key]={level,at:Date.now()};state.value.mistakes=state.value.mistakes.filter(x=>x.key!==key);if(level>0)state.value.mistakes.push({key,section,question,answer})}
  function addReview(review:SpeakingReview){state.value.speakingReviews.push(review)}
  function reset(){state.value=blank()}
  watch(state,value=>localStorage.setItem(KEY,JSON.stringify(value)),{deep:true})
  return{state,sectionIds,completed,mastery,mistakes,setSection,rateQuestion,addReview,reset}
})
