'use client'
import{FormEvent,useState}from"react"
import{put}from"./_use_serv"
import{redirect as r}from'next/navigation'

export default function _(){
  // prevent `Enter` key's default
  const e =
    (e:React.KeyboardEvent<HTMLInputElement>)=>{
      if(e.key === 'Enter'){
        e.preventDefault()
      }
    }

    const [isPending,setPending] = useState(false)

  const _put = async(e:FormEvent<HTMLFormElement>)=>{
    setPending(true)
    e.preventDefault()
    const res = await put(
      Object.fromEntries(
        (new FormData(e.currentTarget)).entries()
      ) as Record<string, string>
    )
    
    res
      ? (()=>{
          setPending(false)
          alert("Failed to post.\nPlease contact Thisoe with your visitor ID: "+res)
        })()
      : r('gesipan')
  }

  return <form onSubmit={_put} id="post">
    <input
      id="posttitle"
      type="text"
      name="title"
      placeholder="Bulletin Title"
      onKeyDown={e}
    /><hr/>
    <input
      id="postname"
      type="text"
      name="name"
      placeholder="Author Name"
      onKeyDown={e}
    /><hr/>
    <textarea name="bull"></textarea>
    <input value=""
      id="postsubmit"
      type="submit"
      title="Post Bulletin"
      className={isPending?'ps_ispending':undefined}
      disabled={isPending}
    />
  </form>
}