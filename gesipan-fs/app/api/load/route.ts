import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/_lib/logsys"
import{mainDB}from"@/_lib/_insu"

let pro:string

export async function GET(req:NextRequest){t.t1(req)
  pro='LOAD'
  try{
    const docs = await(await mainDB)
      .find({stat:1},{projection:{'_id':0,'stat':0,'c':0}})
      .sort({'dt':-1})
      .toArray()

    console.log(`[${t.t2+pro} 200] Loaded ${docs.length} rows.`)
    return NJ({thisoe:200,docs})
  }catch(_){
    t.t500(pro)
    console.dir(_)
    return t.NJ500
  }
}