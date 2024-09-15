import{Metadata}from"next"
import"./thisoe.css"
import Link from"next/link"

export const metadata:Metadata={
  title: "Thisoe Gesipan",
  description: "[BETA] Thisoe Gesipan - BBS Project based on Next.js \n Thisoe Projects - Coding practice",
  keywords:['Thisoe','bulletin board system','NextJS'],
}

export default function RootLayout(
  {children,}
    :Readonly<{children:React.ReactNode}>
){
  return <html lang="en">
    <body>
      <header>Thisoe&apos;s Gesipan</header>
      <nav><i>
        <Link href='gesipan'>Bulletin Board System</Link><hr/>
        <Link href='post'>Write a New Post</Link><hr/>\
        <Link href='admin'>BBS Admin</Link>
      </i></nav>
      <i id="iframe">{children}</i>
    </body>
  </html>
}