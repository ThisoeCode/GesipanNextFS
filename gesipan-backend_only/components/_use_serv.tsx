'use server'
import{mainDB}from"@/_lib/_insu"
import{API,headJ,mainFormat,TGID,Thisoe}from"@/_lib/conf"
import{servTitle as t}from"@/_lib/logsys"
import{revalidatePath}from"next/cache"
const ermsg='[THISOE🩵DEBUG] Form submitting error: UNKNOWN ERROR!'

/**
 * Serve for `useActionState`
 * @description DISABLED BEFORE `React 19 RC` CAME OUT (Thisoe 2024/09/19)
 */
export default async function ACTION(
  prevStat:string|number|void|null,
  formData:FormData,
){
  const pro='PUT-USE_SERVER'
  const _get = (key:string)=>formData.get(key) as string

  try{
    // Generate OBJ
    const obj:mainFormat = {
      g:TGID(),
      t:_get("title"),
      n:_get("name"),
      c:_get("bull"),
      dt:Math.floor(Date.now()/1000),
      stat:1,
    }
      // Storing to DB
    try{
      try{
        const res = await(await mainDB)
          .insertOne(obj)
        const id = res.insertedId.toString('hex')
        console.log(`[${t.t2+pro} 200] Added new docu: ObjectId[${id}]`)
        revalidatePath('/')
      }catch(e){
        console.error(`[${t.t4+pro} 500] Fail to add document!`)
        console.dir(formData)
        return `[${t.t4}500] Post failed.`
      }
    }catch(_){
      t.t500(pro+':0100100')
      console.dir(_)
      return ermsg
    }

  }catch(_){
    t.t500(pro+':0100256')
    console.dir(_)
    return ermsg
  }
}



import axios from "axios"

/** 
 * Serve for `FormData` and traditional server compoenent PUTs
 * @description Use `as Record<string, string>`
 */
export const put = async(data:Record<string,Thisoe>,apiRoute:string)=>{
  const SERV_ID = crypto.randomUUID()
  try{
    const res = await axios.put(
      API+apiRoute,
      [data,SERV_ID], {headers:headJ}
    )
    if(res.status >= 200 && res.status < 300){
      return 0
    }
    console.error(`[Thisoe] Error: PUTFAILED. (SERV_ID::${SERV_ID})`)
    return SERV_ID
  }catch(e){
    console.error(`[Thisoe] Error: AXIOSNOTPUTTING {{ ${e} }} WITH SERV_ID::`+SERV_ID)
    return SERV_ID
  }
}