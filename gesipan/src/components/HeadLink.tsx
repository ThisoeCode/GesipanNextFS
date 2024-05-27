import Link from "next/link"
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react"

type HeadLinkProp = {
  children:React.ReactNode
  href:string
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export default function HeadLink({children,href,...props}:HeadLinkProp){
  return <Link className="head-link"
    href={href}
    {...props}
   >{children}</Link>
}