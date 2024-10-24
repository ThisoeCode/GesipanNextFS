import{API,Load}from"@/_lib/conf"
import Detail from "@/components/detail"
import{NoCtt,UnexpectedDetail}from"@/components/noctt"

export default async function _({params:{g}}:{params:{g:string}}){
  const gesimul:Load = await(
    await fetch(API+'load/'+g,{
      method: 'GET',
      cache: 'no-store',
    })).json()

  const SERV_ID = crypto.randomUUID().replace(/\-/g,'').slice(7)

  // 1. Show Gesimul
  if(gesimul && gesimul.thisoe===200 && typeof gesimul.docs !='undefined'){
    return <Detail data={gesimul.docs[0]} g={g}/>
  }
  // 2. ERROR: Gesimul Do Not Exist
  else if(gesimul.thisoe===204){
    return <NoCtt/>
  }
  // 3. ERROR: MongoDB responses a falsy content `gesimul`
  else if(!gesimul){
    console.error(`[Thisoe] Error: DETAILEMPTYRESPONSE {{ ${g} }} WITH SERV_ID::`+SERV_ID)
  }
  // 4. ERROR: Non of above
  else{
    console.error(`[Thisoe] Error: DETAILLOADFAIL {{ ${g} }} WITH SERV_ID::`+SERV_ID)
  }
  return UnexpectedDetail({SERV_ID})
}