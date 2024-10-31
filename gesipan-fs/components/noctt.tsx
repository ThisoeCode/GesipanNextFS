export function NoCtt({admin=false}:{admin?:boolean}){
  return <p id="unexist">
    This post does not exist or was deleted.<br/>
    <a href={admin?"/admin":"/gesipan"}>Go Back</a>
  </p>
}

export function UnexpectedDetail({SERV_ID}:{SERV_ID:string}){
  return <p id="unexist">
    The server went wrong.<br/>
    Please contact Thisoe with your visitor ID: <b>{SERV_ID}</b><br/>
    <br/><a href="/gesipan">Go Back</a>
  </p>
}