import HeadLink from "./HeadLink"
import Image from "next/image"

export default function NAV(){
  const
    ico=(_:string)=>{return `streamline-${_}-178577.svg`},
    l=21
  return <>
    <header>
      <p className="font-bold text-center text-3xl m-3">Rich Gesipan</p>
      <nav>
        <HeadLink href="/bbs" ttl='Bulletin Home'>
          <Image src={ico('home')} width={l} height={l} alt='Home'/>
        </HeadLink>
        <HeadLink href="/post" ttl='Write a New Post'>
          <Image src={ico('write')} width={l} height={l} alt='Post'/>
        </HeadLink>
        <HeadLink href="/admin" ttl='Admin System'>
          <Image src={ico('admin')} width={l} height={l} alt='Admin'/>
        </HeadLink>
      </nav>
    </header>
  </>
}