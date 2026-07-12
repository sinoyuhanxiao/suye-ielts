export type SectionId = 'grammar'|'linking'|'vocab'|'speaking'|'letter'|'essay'|'drill'
export type Mastery = 0|1|2
export interface Mistake { key:string; section:SectionId; question:string; answer:string }
export interface SpeakingReview { at:number; ratings:{fluency:number;vocabulary:number;grammar:number;pronunciation:number} }
export interface LearningState { version:3; sections:Partial<Record<SectionId,boolean>>; questions:Record<string,{level:Mastery;at:number}>; mistakes:Mistake[]; speakingReviews:SpeakingReview[]; checklist:boolean[] }
