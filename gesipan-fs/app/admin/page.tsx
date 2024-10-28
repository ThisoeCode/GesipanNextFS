import{Alert}from"@/components/Alert"
import Atable from"@/components/atable"
export default function _({searchParams}:{searchParams:{err?:string}}){
  const msg=searchParams?.err
    ? '[THISOE_ADMIN_ERR]\n'+searchParams.err
    : null
  return<>
    <h1 style={{textAlign:'center',margin:'0 0 9pt'}}>Admin</h1>
    <Alert msg={msg}/>
    <Atable admin/>
  </>
}