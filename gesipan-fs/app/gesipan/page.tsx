import Atable from "@/components/atable"
import Link from "next/link"

export default function _({searchParams}:{searchParams:{posted?:string}}){
  return <>
    <Atable sp={searchParams}/>
    <i id='wrap-goto-post'>
      <Link id="goto-post" title="Write a New Post" href='/post'>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#333" fillRule="evenodd" d="M9.88 8.388a1.25 1.25 0 0 1-.664.348l-3 .54A1.25 1.25 0 0 1 4.76 7.843l.5-3.04a1.25 1.25 0 0 1 .351-.683L9.75 0H2.5A1.5 1.5 0 0 0 1 1.5v8.919l-.974 2.923a.5.5 0 0 0 .595.643L4.561 13H12.5a1.5 1.5 0 0 0 1.5-1.5V4.25zM12.319.077a1 1 0 0 0-1.095.219l-4.73 4.71l-.5 3.04l3-.54l4.71-4.73a1 1 0 0 0 0-1.42l-1.06-1.06a1 1 0 0 0-.325-.22Z" clipRule="evenodd"/></svg>
      </Link>
    </i>
  </>
}