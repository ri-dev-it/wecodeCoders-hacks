import { demo } from '../data/demo';
const endpoint='/api';
export async function runStage(stage, context) {
 try { const response=await fetch(`${endpoint}/${stage}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(context)}); if(!response.ok) throw new Error('The studio could not complete this stage.'); const result=await response.json(); return {...result,mode:result.mode||'AI'}; }
 catch(error) { if (import.meta.env.DEV || context?.demoMode) return {...(demo[stage==='directions'?'directions':stage] ? {[stage==='directions'?'directions':stage]:demo[stage==='directions'?'directions':stage]} : {}),mode:'DEMO',fallback:true}; throw error; }
}
