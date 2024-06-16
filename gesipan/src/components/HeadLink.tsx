import T from "@/lib/Types"
import Link from "next/link"

export type HeadLinkProp = 
  T.C.Child & T.C.LinkProps

export default function _({children,...props}:HeadLinkProp){
  return <Link className="head-link"
    {...props}
   >{children}</Link>
}