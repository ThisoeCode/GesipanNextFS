import HeadLink from "./HeadLink"

export default function NAV(){
  return <>
    <header>
      <p className="font-bold text-center text-3xl m-3">Rich Gesipan</p>
      <nav>
        <HeadLink href="/bbs">Bulletin Board System</HeadLink>
        <HeadLink href="/post">Write a New Post</HeadLink>
        <HeadLink href="/admin">Admin System</HeadLink>
      </nav>
    </header>
  </>
}