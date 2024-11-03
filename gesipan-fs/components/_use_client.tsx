'use client'
import{API}from"@/_lib/conf"
import type{DEL}from"@/_lib/conf"
import{iAE,redirect as r}from"./_use_serv"

const
  delSuc=(descCount:number|string)=>`Deleted successfully.\n(Also deleted ${descCount} related replies.)`


// 1. (admin) delete gesimul/reply button
async function checkExp(){
  if(await iAE()){
    r('/adminlogin?err=exp')
  }
}
export function DelRowBtn({g,txt,cmt=false}:{
  g:string,
  txt:string,
  cmt?:boolean,
}){
  const del=async()=>{
    await checkExp()
    const
      res=await fetch(API+'admin/del/'+g+(cmt?'?cmt=1':'')),
      delRes:DEL = await res.json()
    if(!(res.status<299)){
      return alert('UNEXPECTED API ERROR: '+res.status+'\nPlease contact Thisoe with code "CLIENT_BADAPICONNECTION".')
    }
    delRes?.del===1
      ? (()=>{
          alert(delSuc(delRes.delCmtCount))
          cmt
            ? window.location.reload()
            : setTimeout(()=>{r('/admin')}, 99)
        })()
      : alert('Failed to delete:\n'+(cmt?'Reply':'Post')+' NO. '+g)
  }
  return<button className={cmt?'delcmt':''} onClick={del}>{txt}</button>
}