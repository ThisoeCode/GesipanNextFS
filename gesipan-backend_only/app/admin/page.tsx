import{logout,getSession}from'@/_lib/admin'
import{redirect}from'next/navigation'

export default async function _(){
  const session = await getSession()
  console.dir(session)
  if(!session){
    logout()
    redirect('/adminlogin?err=exp')
  }
  return <i style={{
    width:'100%',height:'100%',
    backgroundColor:'#000',
    color:'#ccc',textAlign:'center',
  }}>
    &nbsp;<br/> admin page: 404 - Not done coding :( <br/>&nbsp;
    <br/>{JSON.stringify(session)||'no session'}
  </i>
}