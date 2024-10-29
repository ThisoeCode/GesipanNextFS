'use client'
import{API}from"@/_lib/conf"
import{iAE,redirect as r}from"./_use_serv"

async function checkExp(){
  if(await iAE()){
    r('/adminlogin?err=exp')
  }
}

export function DelRowBtn({g,txt}:{g:string,txt:string}){
  const del=async()=>{
    await checkExp()
    await(
      await fetch(API+'admin/del/'+g)
    ).json()
      ? window.location.reload()
      : alert('Failed to delete:\nPost NO. '+g)
  }
  return<button onClick={del}>{txt}</button>
}

export function DelCmt({no,children}:{no:string,children:React.ReactNode}){
  
  const del=async()=>{
    await checkExp()
    await(
      await fetch(API+`admin/del/${no}?cmt=1`)
    ).json()
      ? window.location.reload()
      : alert('Failed to delete:\nReply NO. '+no)
  }
  return<button className="delcmt" onClick={del}>{children}</button>
}