'use server'
import axios from "axios"
import T from "@/lib/Types"

export const put = async (doc:T.C.form)=>{
  const res = await axios.put('/serv/',
    convertToDb(doc), {
      headers: headJ,
      cache: 'no-store',
    })
    if(res.status >= 200 && res.status < 300){
      return res.data.rid
    }
    return null
}