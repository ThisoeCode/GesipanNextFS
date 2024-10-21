import{getSession,login}from'@/_lib/admin'
import{redirect}from'next/navigation'

export default async function _({searchParams}:{searchParams?:{err?:string}}){
  const
    session = await getSession(),
    err=(_:string)=>_===searchParams?.err
  session && redirect('/admin')
  return <i id='login'>
    <p>{
      err('badpw') ? 'Wrong password.' :
      err('exp') ? 'Admin login expired.' :
      err('admin') ? 'Admin login required.' :
    ''}</p>
  <form action={async(formData)=>{
    'use server'
    if(formData.get('admin')===process.env.ADMIN_PW){
      await login('admin')
      redirect('/admin')
    }else{
      redirect('/adminlogin?err=badpw')
    }
  }}>
    <label>Admin password:</label>
    <input name="admin" type="password"/>
  </form></i>
}