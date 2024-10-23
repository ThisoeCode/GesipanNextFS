import Link from"next/link"
import{API,TIMEZONE}from"@/_lib/conf"
export default function Arow(
  {no,title,ann,date,g='0',admin=false}:{
    no:number,
    title:string,
    ann:string,
    date:number,
    g?:string,
    admin?:boolean,
  }
){
  return<><Link
  title={title}
  href={(admin?'/admin':'')+'/detail/'+g}
  className={'tr'+(admin?' admin':'')}>
    <p>{no}</p>
    <p>{title}</p>
    <p>{ann}</p>
    <p>{ // convert unixTimestamp to date
      (()=>{
        return new Date(date*1000)
          .toLocaleDateString(undefined,{
            year:'numeric',
            month:'2-digit',
            day:'numeric',
            timeZone:TIMEZONE,
        })
      })()
    }</p>
  </Link>
  {admin&&<DelRowBtn g=''/>}
  </>
}

function DelRowBtn({g}:{g:string}){
'use client'
  const del=async()=>{
    await(
      await fetch(API+'admin/del/'+g)
    ).json()
      ? window.location.reload()
      : alert('Failed to delete:\nPost NO. '+g)
  }
  return<button className="del-row" onClick={del}>🚮</button>
}