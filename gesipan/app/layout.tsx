import{Metadata}from"next"
import"./globals.css"
import"./thisoe.css"
import NAV from "@/components/Head"

export const metadata:Metadata={
  title: "Thisoe Gesipan",
  description: "Thisoe Gesipan - The rich text editor BBS Project based on Next.js. \n Thisoe Projects - Coding practice \n ...",
  keywords:['Thisoe','bulletin board system','NextJS'],
}

export default function RootLayout(
  {
    children,
  }:Readonly<{children:React.ReactNode}>
){
  return <html lang="en">
    <body>
      <NAV/>
      {children}
    </body>
  </html>
}