import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/_lib/logsys"
import{mainDB}from"@/_lib/_insu"

let pro:string

export async function GET(req:NextRequest,{params:{g}}:{params:{g:string}}){t.t1(req)
  pro='DETAIL'

  try{
    const docs = await(await mainDB).find(
      {g},{projection:{'_id':0,'stat':0,'g':0}}
    ).toArray()

    if(!docs[0]?.t){
      return NJ({thisoe:204})
    }

    return NJ({thisoe:200,docs})
  }catch(_){
    t.t500(pro)
    console.dir(_)
    return t.NJ500
  }
}