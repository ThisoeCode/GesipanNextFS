import{Metadata}from"next"
import"./globals.css"
import NAV from "@/components/Head"

export const metadata:Metadata={
  title: "Gesipan | Thisoe",
  description: "Thisoe Projects - Gesipan Project using Next.js\n...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <html lang="en">
    <body>
      <NAV/>
      {children}
    </body>
  </html>
}
