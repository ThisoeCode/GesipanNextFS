import{login}from'@/_lib/admin'
import{redirect}from'next/navigation'

export default async function _({searchParams}:{searchParams?:{err?:string}}){
  const e=searchParams?.err
  return <i id='login'>
    <p>{
      e==='exp' ? 'Admin login expired.' :
      e==='badpw' && 'Wrong password.'
    }</p>
  <form action={async(formData)=>{
    'use server'
    if(formData.get('admin')===process.env.ADMIN_PW){
      await login('admin')
      redirect('/admin')
    }else{
      console.error('BADPWWWWWWWWWWWWWWWWWWWWWWWWWWWWW')
      redirect('./?err=badpw')
    }
  }}>
    <label>Admin password:</label>
    <input name="admin" type="password"/>
  </form></i>
}