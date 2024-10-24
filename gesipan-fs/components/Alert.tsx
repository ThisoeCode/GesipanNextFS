'use client'
export function Alert({msg}:Readonly<{msg:string|null}>){
  msg && alert(msg)
  return<></>
}