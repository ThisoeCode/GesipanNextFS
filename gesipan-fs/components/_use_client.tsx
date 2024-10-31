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
    const delRes:DEL = await(
      await fetch(API+'admin/del/'+g+(cmt&&'?cmt=1'))
    ).json()
    delRes?.del
      ? (()=>{
        alert(delSuc(delRes.delCmtCount))
        setTimeout(()=>{r('/admin')}, 99)
      })()
      : alert('Failed to delete:\n'+(cmt?'Reply':'Post')+' NO. '+g)
  }
  return<button className={cmt?'delcmt':''} onClick={del}>{txt}</button>
}