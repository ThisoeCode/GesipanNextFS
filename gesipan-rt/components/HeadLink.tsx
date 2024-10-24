import T from "@/lib/Types"
import Link from "next/link"
import{Button}from"./ui/button"

export type HeadLinkProp = 
  T.C.Child & T.C.LinkProps & {ttl?:string}

export default function _({children,ttl='',...props}:HeadLinkProp){
  return <Button asChild title={ttl}><Link className="text-lime-300"
    {...props}
   >{children}</Link></Button>
}