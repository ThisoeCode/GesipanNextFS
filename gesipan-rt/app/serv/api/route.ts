import T from "@/lib/Types"

type Params = {
  title: string
}

export async function GET(
  request: Request,
  context: {params:T.C.form},
  /*{params}: {params:{gid:string}}*/
){
  // const team = gid // '1'
}