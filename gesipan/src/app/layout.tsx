import type{Metadata}from"next"
import"./globals.css"

export const metadata:Metadata={
  title: "Gesipan | Thisoe",
  description: "Thisoe - Gesipan Project using Next.js\n...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
    <body>
      {children}
    </body>
  </html>
}
