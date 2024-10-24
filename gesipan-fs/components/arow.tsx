import Link from"next/link"
import{TIMEZONE}from"@/_lib/conf"
import{DelRowBtn}from"./_use_client"

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
  return<AdminRow admin={admin} g={g}><Link
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
  </Link></AdminRow>
}

function AdminRow({children,g,admin}:
  Readonly<{g:string,admin:boolean,children:React.ReactNode}>
){
  if(admin)
    return <i className="adminwrap">
      {children}
      {admin&&<DelRowBtn g={g}/>}
    </i>
  return<>{children}</>
}