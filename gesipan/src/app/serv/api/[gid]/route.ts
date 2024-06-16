type Params = {
  team: string
}
 
export async function GET(request: Request, context: { params: Params }, {params}: {params:{gid:string}}) {
  // const team = gid // '1'
}