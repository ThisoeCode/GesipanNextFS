import{API,Load}from"@/_lib/conf"
import Detail from "@/components/detail"
import{redirect as r}from'next/navigation'

export default async function _({params:{g}}:{params:{g:string}}){
  const gesimul:Load = await(
    await fetch(API+'load/'+g,{
      method: 'GET',
      cache: 'no-store',
    })).json()
    // 1. Show Gesimul
    if(gesimul && gesimul.thisoe===200 && gesimul.docs){
      // TODO
      return <i>{gesimul.docs[0].t}</i>
    }
    // 2. ERROR: Gesimul Do Not Exist
    else if(gesimul.thisoe===204) r('/admin')
    // 3. ERROR: MongoDB responses a falsy content `gesimul`
    else if(!gesimul) r('/admin')
    // 4. ERROR: Non of above
    else r('/admin')
}