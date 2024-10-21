import AdminAuthProvider from "./AdminAuthProvider"
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <AdminAuthProvider>{children}</AdminAuthProvider>
}