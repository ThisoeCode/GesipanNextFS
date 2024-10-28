import{NJ}from"@/_lib/logsys"
import type{NextRequest}from"next/server"

export async function POST(req:NextRequest,{params}:{params:{g:string}}){
  /** 
   * - `null`: post
   * - `'1'`: cmt / ctc
   */
  const cmt = req.nextUrl.searchParams.get('cmt')
  // TODO : del backend
  console.log(cmt,params?.g)
  return NJ({a:await(req.json())},500)
}