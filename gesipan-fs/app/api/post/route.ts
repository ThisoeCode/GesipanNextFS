import{NextRequest}from"next/server"
// import{mainDB}from"@/_lib/_insu"
// import{mainFormat}from"@/_lib/conf"
import{NJ,servTitle as t}from"@/_lib/logsys"

// const pro='PUT'

// export async function PUT(req:NextRequest){t.t1(req)

//   const reqbody = await req.json()

//   // VALIDATION
//   if(!
//     (<T extends Record<string,unknown>>(obj:T, keys:(keyof T)[])=>{
//       const objKeys = Object.keys(obj) as (keyof T)[]
//       return objKeys.length===keys.length && keys.every(key => objKeys.includes(key))
//     })(reqbody,['title','name','bull'])
//   ){return t.t422(req_SERV_ID)}

//   // Generate OBJ
//   const obj:mainFormat = {
//     g:TGID(),
//     t:reqbody.title,
//     n:reqbody.name,
//     c:reqbody.bull,
//     dt:Math.floor(Date.now()/1000),
//     stat:1,
//   }

//   // Storing to DB
//   try{
//     try {
//       const res = await(await mainDB)
//         .insertOne(obj)
//       const id = res.insertedId.toString('hex')
//       console.log(`[${t.t2+pro} 200] Added new docu: ObjectId[${id}]`)
//       return NJ({rid:id})
//     }catch(e){
//       console.error(`[${t.t4+pro} 500] Fail to add docu!`)
//       console.dir(reqbody)
//       return NJ({rid:null},500)
//     }
//   }catch(_){
//     t.t500(pro)
//     console.dir(_)
//     return t.NJ500
//   }
// }

export async function GET(req:NextRequest){
  t.t1(req)
  return NJ({pong:200})
}