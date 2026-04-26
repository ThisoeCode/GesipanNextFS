'use client'
export function Alert({msg}:Readonly<{msg:string|null}>){
  if(msg) alert(msg)
  return<></>
}