import AuthProv from "@/components/AdminAuthProvider"
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <AuthProv>{children}</AuthProv>
}