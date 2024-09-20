import Link from"next/link"
import{TIMEZONE}from"@/_lib/conf"
export default function Arow(
  {no,t,a,d,g,}:{
    no:string,
    t:string,
    a:string,
    d:number,
    g:number,
  }
){
  return <Link className='tr' href={'detail?g='+g}>
    <p>{no}</p>
    <p>{t}</p>
    <p>{a}</p>
    <p>{ // convert unixTimestamp to date
      (()=>{
        return new Date(d*1000)
          .toLocaleDateString(undefined,{
            year:'numeric',
            month:'2-digit',
            day:'numeric',
            timeZone:TIMEZONE,
        })
      })()
    }</p>
  </Link>
}