import { createContext,useContext,useEffect,useMemo,useState } from 'react';
const Workflow=createContext(null);
const empty={idea:null,discover:null,positioning:null,directions:[],selectedDirection:null,shape:null,visualize:null,challenge:null,launch:null,consistencyChecks:[],selectedName:'',tagline:'',stage:-1};
export function WorkflowProvider({children}){
 const [project,setProject]=useState(()=>{try{return {...empty,...JSON.parse(localStorage.getItem('stb-project')||'{}')}}catch{return empty}});
 const [theme,setTheme]=useState(()=>localStorage.getItem('stb-theme')||'light');
 useEffect(()=>{localStorage.setItem('stb-project',JSON.stringify(project));},[project]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('stb-theme',theme);},[theme]);
 const patch=(values)=>setProject(p=>({...p,...values}));
 const reset=()=>{setProject(empty);localStorage.removeItem('stb-project');};
 const value=useMemo(()=>({project,patch,reset,theme,setTheme}),[project,theme]);
 return <Workflow.Provider value={value}>{children}</Workflow.Provider>
}
export const useWorkflow=()=>useContext(Workflow);
