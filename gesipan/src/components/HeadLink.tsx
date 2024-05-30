import T from "@/lib/Types"
import Link from "next/link"

export type HeadLinkProp = 
  T.C.Children &
  T.C.LinkProps

export default function HL({children,...props}:HeadLinkProp){
  return <Link className="head-link"
    {...props}
   >{children}</Link>
}