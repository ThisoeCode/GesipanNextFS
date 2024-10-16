import{NextRequest}from"next/server"
import{NJ,servTitle as _t}from"@/_lib/logsys"
import{cmtDB}from"@/_lib/_insu"
import{cmtFormat,TGID}from"@/_lib/conf"
import type{PUT}from"@/_lib/conf"

const pro='PUT_CTC'

export async function PUT(req:NextRequest,{params}:{params:{no:string}}){_t.t1(req)
  const
  reqbody:PUT<{ctc_ctt:string,ctc_name:string}> = (await req.json()),
  ctc = reqbody[0],
  req_SERV_ID = reqbody[1],
  servidMsg = '\nSERV_ID::'+req_SERV_ID,
  tocmt=params.no

  // VALIDATION
  if(tocmt.length<9||!
    (<T extends Record<string,unknown>>(obj:T, keys:(keyof T)[])=>{
      const objKeys = Object.keys(obj) as (keyof T)[]
      return objKeys.length===keys.length && keys.every(key => objKeys.includes(key))
    })(ctc,['ctc_ctt','ctc_name'])
  ){return _t.t422('cmt_0')}

  // Generate OBJ
  const
  name = ctc.ctc_name,
  ctt = ctc.ctc_ctt,
  n = name.trim()==='' ? '(Anonymous)' : name.trim(),
  c = ctt.trim()==='' ? ' ' : ctt,
  dt = Math.floor(Date.now()/1000),
  doc:cmtFormat = { no:TGID(),tocmt,n,c,dt,g:'',stat:1,ctc_count:0 }

  // Storing to DB
  try{
    try {
      const res = await(await cmtDB)
        .insertOne(doc)
      const id = res.insertedId.toString('hex')
      console.log(`[${_t.t2+pro} 201] Added new docu: ObjectId[${id}] `+servidMsg)
      const inc = await(await cmtDB)
        .updateOne({no:tocmt},{$inc:{ctc_count:1}})
      if(inc.modifiedCount===1){
        return NJ({rid:id})
      } return NJ({thisoe_err:"Ctc posted but reply count failed to update."},500)
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
}