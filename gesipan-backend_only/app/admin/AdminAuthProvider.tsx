import{logout,getSession}from'@/_lib/admin'
import{redirect}from'next/navigation'

export default async function AdminAuthProvider({children,searchParams}
  :Readonly<{children:React.ReactNode,searchParams?:{err?:string}}>
){
  searchParams?.err==='badpw' && redirect('/adminlogin?err=badpw')
  const session = await getSession()
  if(!session){
    logout()
    redirect('/adminlogin?err=exp')
  }
  return <>{children}</>
}