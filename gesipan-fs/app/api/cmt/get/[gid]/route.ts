import{NJ,servTitle as _t}from"@/_lib/logsys"
import{cmtDB}from"@/_lib/_insu"
import type{NextRequest}from"next/server"

export async function GET(req:NextRequest,{params}:{params:{gid:string}}){_t.t1(req)
  const pro='LOAD_CTC',

  g = params.gid
  if(!g){return _t.t422('(cmt/get)')}

  try{
    const docs = await(await cmtDB)
      .find({stat:1,tocmt:g},{projection:{'_id':0,'stat':0}})
      .sort({'dt':-1})
      .toArray()

    console.log(`[${_t.t2+pro} 200] Loaded ${docs.length} replies under reply "${g}".`)
    return NJ({thisoe:200,docs})
  }catch(_){
    _t.t500(pro)
    console.dir(_)
    return _t.NJ500
  }
}