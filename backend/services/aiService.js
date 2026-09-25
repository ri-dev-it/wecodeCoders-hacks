import {prompts} from '../prompts/index.js';
import {demoResponses} from './demoResponses.js';
export async function generate(stage,context){
 const key=process.env.AI_API_KEY;
 if(!key)return {data:demoResponses[stage](context),mode:'DEMO'};
 const provider=(process.env.AI_PROVIDER||'openai').toLowerCase();
 if(!['openai','openai-compatible'].includes(provider))throw new Error(`Provider ${provider} is not supported by the configured adapter.`);
 const base=(process.env.AI_BASE_URL||'https://api.openai.com/v1').replace(/\/$/,'');
 const response=await fetch(`${base}/chat/completions`,{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.AI_MODEL||'gpt-4o-mini',temperature:.7,response_format:{type:'json_object'},messages:[{role:'system',content:prompts[stage]},{role:'user',content:JSON.stringify(context)}]})});
 if(!response.ok)throw new Error(`AI provider returned ${response.status}: ${(await response.text()).slice(0,300)}`);
 const payload=await response.json();const content=payload.choices?.[0]?.message?.content;if(!content)throw new Error('AI provider returned no content');
 let data;try{data=JSON.parse(content)}catch{throw new Error('AI response was not valid JSON');}
 return {data,mode:'AI'};
}
