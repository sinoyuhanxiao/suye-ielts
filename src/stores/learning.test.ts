import { beforeEach,describe,expect,it } from 'vitest'
import { createPinia,setActivePinia } from 'pinia'
import { useLearningStore } from './learning'

describe('learning store',()=>{
  beforeEach(()=>{localStorage.clear();setActivePinia(createPinia())})
  it('tracks section completion',()=>{const store=useLearningStore();store.setSection('grammar',true);expect(store.completed).toBe(1)})
  it('adds uncertain answers and removes mastered ones from mistakes',()=>{const store=useLearningStore();store.rateQuestion('grammar:1','grammar','q','a',1);expect(store.mistakes).toHaveLength(1);store.rateQuestion('grammar:1','grammar','q','a',0);expect(store.mistakes).toHaveLength(0);expect(store.mastery).toBe(100)})
  it('resets progress',()=>{const store=useLearningStore();store.setSection('essay',true);store.reset();expect(store.completed).toBe(0)})
})
