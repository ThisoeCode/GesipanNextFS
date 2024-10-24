import{NextRequest}from"next/server"
import{mainDB}from"@/_lib/_insu"
import{mainFormat,TGID}from"@/_lib/conf"
import{NJ,servTitle as _t}from"@/_lib/logsys"
import type{PUT}from"@/_lib/conf"

const pro='PUT_GESIMUL'

export async function PUT(req:NextRequest){_t.t1(req)

  const reqJ:PUT<{title:string,name:string,bull:string}> = (await req.json())
  const
  reqbody = reqJ[0],
  req_SERV_ID = reqJ[1],
  servidMsg = '\nSERV_ID::'+req_SERV_ID

  // VALIDATION
  if(!
    (<T extends Record<string,unknown>>(obj:T, keys:(keyof T)[])=>{
      const objKeys = Object.keys(obj) as (keyof T)[]
      return objKeys.length===keys.length && keys.every(key => objKeys.includes(key))
    })(reqbody,['title','name','bull'])
  ){return _t.t422(req_SERV_ID)}

  // Generate OBJ
  const
  t = reqbody.title.trim()===''? 'No Title' : reqbody.title.trim(),
  n = reqbody.name.trim()==='' ? '(Anonymous)' : reqbody.name.trim(),
  c = reqbody.bull.trim()==='' ? 'This post has no content.' : reqbody.bull,
  dt = Math.floor(Date.now()/1000),
  obj:mainFormat = { g:TGID(), t, n, c,dt, stat:1, }

  // Storing to DB
  try{
    try {
      const res = await(await mainDB)
        .insertOne(obj)
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
}


export async function GET(req:NextRequest){
  _t.t1(req)
  return NJ({pong:200})
}