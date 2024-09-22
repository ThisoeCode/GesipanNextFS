import{NJ}from"@/_lib/logsys"

export async function POST(req:Request){
  return NJ({a:await(req.json())},500)
}