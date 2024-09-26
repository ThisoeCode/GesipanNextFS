import Link from"next/link"
import{TIMEZONE}from"@/_lib/conf"
export default function Arow(
  {no,title,ann,date,g='0',}:{
    no:number,
    title:string,
    ann:string,
    date:number,
    g?:string,
  }
){
  return <Link title={title} href={'/detail/'+g} className='tr'>
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
}