'use server'
import{mainDB}from"@/_lib/_insu"
import{mainFormat}from"@/_lib/conf"
import{servTitle as t}from"@/_lib/logsys"
import{revalidatePath}from"next/cache"
const ermsg='[THISOE🩵DEBUG] Form submitting error: UNKNOWN ERROR!'

export default async function ACTION(
  prevStat:string|number|void|null,
  formData:FormData,
){
  const pro='PUT-USE_SERVER'
  const _get = (key:string)=>formData.get(key) as string

  try{
    // Generate OBJ
    const obj:mainFormat = {
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
        console.log("typeof prevStat = "+typeof prevStat) // TODO REMOVE
        console.log(prevStat) // TODO REMOVE
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