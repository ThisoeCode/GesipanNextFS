const {SELF_URL}=process.env
if(!SELF_URL){ // TS mustdo
  throw new Error('[THISOE🩵DEBUG] Missing environment variables.')
}
/** API path base ("http://localhost:0/api/") */
export const API = SELF_URL+'/api/'

/** Get user's timezone */
export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone


export interface mainFormat {
/** title */
  t:string
/** author */
  n:string
/** main content */
  c:string
/** unix timestamp */
  dt:number
/** gesimul status */
  stat:-1|0|1|2|3
}

export type Load = {
  thisoe: 100|200|201|202|304|400|403|404|422|500|501,
  docs?: {
    no:string
    title:string
    ann:string
    dt:number
    gid:number
  }[],
} | {thisoe:null}

