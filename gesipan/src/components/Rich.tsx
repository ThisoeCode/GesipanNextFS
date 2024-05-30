import T from "@/lib/Types"
import "./Rich.css"

type RichAdmin = {
  isPost: false
  title: string
  content: string
}

type RichPost = {
  isPost: true
}

type RichProp = T.C.Children & (RichAdmin|RichPost)
export default function Rich({children,isPost}:RichProp){
  return <>
    
  </>
}