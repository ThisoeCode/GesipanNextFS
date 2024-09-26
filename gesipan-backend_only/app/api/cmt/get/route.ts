import{cmtDB}from"@/_lib/_insu"
import{NJ,servTitle as t}from"@/_lib/logsys"
import{NextRequest}from"next/server"

export async function GET(req:NextRequest){

  const pro='LOAD_CMT',

  g = req.nextUrl.searchParams.get('g')
  if(!g){return t.t422('(cmt/get)')}

  try{
    const docs = await(await cmtDB)
      .find({stat:1,g},{projection:{'_id':0,'stat':0,'g':0}})
      .sort({'dt':-1})
      .toArray()

    console.log(`[${t.t2+pro} 200] Loaded ${docs.length} replies under gesimul "${g}".`)
    return NJ({thisoe:200,docs})
  }catch(_){
    t.t500(pro)
    console.dir(_)
    return t.NJ500
  }
}