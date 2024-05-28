import HL from "./HeadLink"

export default function NAV(){
  return <>
    <header>
      Oh hi
      <nav>
        <HL href="bbs">Bulletin Board System</HL>
        <HL href="post">Write a New Post</HL>
        <HL href="admin">Admin System</HL>
      </nav>
    </header>
  </>
}