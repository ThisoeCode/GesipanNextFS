import{NextRequest}from"next/server"
import{NJ,servTitle as _t}from"@/_lib/logsys"
import{cmtDB}from"@/_lib/_insu"
import{cmtFormat,TGID}from"@/_lib/conf"
import type{PUT}from"@/_lib/conf"

const pro='PUT_CMT'

export async function PUT(req:NextRequest){_t.t1(req)
  const
  reqbody:PUT<{cmt:{cmt_ctt:string,cmt_name:string},g:string}> = (await req.json()),
  cmt = reqbody[0],
  req_SERV_ID = reqbody[1],
  servidMsg = '\nSERV_ID::'+req_SERV_ID

  // VALIDATION
  if(!
    (<T extends Record<string,unknown>>(obj:T, keys:(keyof T)[])=>{
      const objKeys = Object.keys(obj) as (keyof T)[]
      return objKeys.length===keys.length && keys.every(key => objKeys.includes(key))
    })(cmt.cmt,['cmt_ctt','cmt_name'])
  ){return _t.t422('cmt_0')}

  // Generate OBJ
  const
  name = cmt.cmt.cmt_name,
  ctt = cmt.cmt.cmt_ctt,
  n = name.trim()==='' ? '(Anonymous)' : name.trim(),
  c = ctt.trim()==='' ? ' ' : ctt,
  dt = Math.floor(Date.now()/1000),
  doc:cmtFormat = {no:TGID(), g:cmt.g, n,c,dt,tocmt:'',stat:1,ctc_count:0}

  // Storing to DB
  try{
    try {
      const res = await(await cmtDB)
        .insertOne(doc)
      const id = res.insertedId.toString('hex')
      console.log(`[${_t.t2+pro} 201] Added new docu: ObjectId[${id}] `+servidMsg)
      return NJ({rid:id})
    }catch(e){
      console.error(`[${_t.t4+pro} 500] Fail to add docu! `+servidMsg)
      console.dir([servidMsg,reqbody])
      return NJ({rid:null},500)
    }
  }catch(_){
    _t.t500(pro)
    console.dir([servidMsg,_])
    return _t.NJ500
  }

  return NJ({a:await(req.json())},500)
}