import{Alert}from"@/components/Alert"
import Atable from"@/components/atable"
export default function _({searchParams}:{searchParams:{err?:string}}){
  const msg=searchParams?.err
    ? '[THISOE_ADMIN_ERR]\n'+searchParams.err
    : null
  return<>
    <Alert msg={msg}/>
    <Atable admin/>
  </>
}