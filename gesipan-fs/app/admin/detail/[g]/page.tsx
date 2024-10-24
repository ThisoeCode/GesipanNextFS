import{API,Load}from"@/_lib/conf"
import Detail from "@/components/detail"
import{redirect as r}from'next/navigation'

export default async function _({params:{g}}:{params:{g:string}}){
  const gesimul:Load = await(
    await fetch(API+'load/'+g,{
      method: 'GET',
      cache: 'no-store',
    })).json(),
    elog=(_:string)=>{
      console.error('[THISOE_ADMIN_ERR] '+_)
      r('/admin?err='+_)
    }
    // 1. Show Gesimul
    if(gesimul && gesimul.thisoe===200 && gesimul.docs){
      return<Detail admin g={g} data={gesimul.docs[0]}/>
    }
    // 2. ERROR: Gesimul Do Not Exist
    else if(gesimul.thisoe===204) elog('taed2')
    // 3. ERROR: MongoDB responses a falsy content `gesimul`
    else if(!gesimul) elog('taed3')
    // 4. ERROR: Non of above
    else elog('tae500')
}