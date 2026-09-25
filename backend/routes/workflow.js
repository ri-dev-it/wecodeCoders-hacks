import {Router} from 'express';
import {z} from 'zod';
import {runWorkflowStage} from '../services/workflowService.js';
const router=Router();
const bodySchema=z.record(z.unknown()).refine(x=>Object.keys(x).length>0,{message:'Workflow context is required'});
for(const stage of ['discover','position','directions','shape','visualize','challenge','launch','consistency']) router.post(`/${stage}`,async(req,res)=>{
 const parsed=bodySchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({error:'Invalid workflow context',issues:parsed.error.issues});
 try{const result=await runWorkflowStage(stage,parsed.data);res.json({...result,mode:result.mode||'DEMO'});}catch(error){console.error(`Stage ${stage} failed`,error);res.status(502).json({error:`Could not complete ${stage}`,detail:error.message});}
});
export default router;
