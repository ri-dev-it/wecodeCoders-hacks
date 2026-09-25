import {generate} from './aiService.js';
export async function runWorkflowStage(stage,context){const {data,mode}=await generate(stage,context);return {...data,mode};}
