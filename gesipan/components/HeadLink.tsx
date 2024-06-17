import T from "@/lib/Types"
import Link from "next/link"
import{Button}from"./ui/button"

export type HeadLinkProp = 
  T.C.Child & T.C.LinkProps

export default function _({children,...props}:HeadLinkProp){
  return <Button asChild><Link className="text-lime-300"
    {...props}
   >{children}</Link></Button>
}