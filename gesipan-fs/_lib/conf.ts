const selfurl=process.env.NEXT_PUBLIC_SELF_URL
if(!selfurl){ // TS mustdo
  throw new Error('[THISOE🩵DEBUG] Missing environment variables.')
}
/** API path base ("http://localhost:0/api/") */
export const API = selfurl+'/api/'
export const headJ = {'Content-Type':'application/json'}

/** Get user's timezone */
export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

/** Thisoe's Gesipan ID (TGID) generator */
export const TGID = ()=>{
  // convert unixTimestamp to base64
  let dt = Date.now(), result = ""
  const base64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
  do{
      result = base64[dt%64] + result
      dt = Math.floor(dt/64)
  } while (dt > 0)
  // make UUID
  const regx=/^.*?(-)/
  const x = crypto.randomUUID(), uu = regx.exec(x)
  return result+(uu?uu[0]:`bruh_${x}`).slice(0,-1)
}

/** Delay */
export function sleepReturn(napTimeInMS:number, callback:()=>Thisoe){
  (new Promise((resolve)=>{setTimeout(()=>{
    resolve(callback())
  } ,napTimeInMS)}))
}


// TYPES preThisoe
import{WithId,WithoutId,Document}from"mongodb"

/** A preparation of everything type. */
export type preThisoe = 
string|number|boolean|undefined|null|
WithId<Document>|WithoutId<Document>|
mainFormat|cmtFormat|Load|Error

/** An everything type. */
export type Thisoe = preThisoe|preThisoe[]|
Record<string,preThisoe>|(()=>preThisoe)

export interface mainFormat {
/** TGID */
  g:string
/** title */
  t:string
/** author */
  n:string
/** main content */
  c?:string
/** unix timestamp */
  dt:number
/** gesimul status */
  stat?:-1|0|1|2|3
}

export interface cmtFormat {
/** TGID */
  no:string
/** under post id */
  g:string
/** under cmt id */
  tocmt?:string
/** author */
  n:string
/** main content */
  c:string
/** number of comments */
  ctc_count:number
/** unix timestamp */
  dt:number
/** gesimul status */
  stat?:-1|0|1|2|3
}

export type Load = {
  thisoe: 200|201|202|204|400|403|404|422|500,
  docs?: mainFormat[],
} | {thisoe:null}

export type PUT<T> = [T,string]

export type DEL = {del:1, delCmtCount:number}