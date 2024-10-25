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