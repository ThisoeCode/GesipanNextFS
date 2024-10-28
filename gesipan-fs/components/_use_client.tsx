'use client'
import{API}from"@/_lib/conf"

export function DelRowBtn({g,txt}:{g:string,txt:string}){
  'use client'
    const del=async()=>{
      await(
        await fetch(API+'admin/del/'+g)
      ).json()
        ? window.location.reload()
        : alert('Failed to delete:\nPost NO. '+g)
    }
  return<button onClick={del}>{txt}</button>
}

export function DelCmt({no,children}:{no:string,children:React.ReactNode}){
  'use client'
    const del=async()=>{
      await(
        await fetch(API+`admin/del/${no}?cmt=1`)
      ).json()
        ? window.location.reload()
        : alert('Failed to delete:\nReply NO. '+no)
    }
  return<button className="delcmt" onClick={del}>{children}</button>
}