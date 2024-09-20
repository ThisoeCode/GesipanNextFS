import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/_lib/logsys"
import{mainDB}from"@/_lib/_insu"
import{Load}from"@/_lib/conf"

let pro:string

export async function GET(req:NextRequest){t.t1(req)
  pro='LOAD'
  try{
    const docs = await(await mainDB)
      .find({},{projection:{'_id':0}})
      .sort({ 'createdtime': -1 })
      .toArray() as Extract<Load,{m:string}>[]

    console.log(`[${t.t2+pro} 200] Loaded ${docs.length} rows.`)
    const toRes:Load = {thisoe:200,docs}
    return NJ({toRes})
  }catch(_){
    t.t500(pro)
    console.dir(_)
    return t.NJ500
  }
}