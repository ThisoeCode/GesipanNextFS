import Link,{LinkProps} from "next/link"

type HeadLinkProp = {
  children:React.ReactNode
} & LinkProps

export default function HL({children,...props}:HeadLinkProp){
  return <Link className="head-link"
    {...props}
   >{children}</Link>
}