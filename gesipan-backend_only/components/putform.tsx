'use client'
import{FormEvent,useState}from"react"
import{put}from"./_use_serv"
import{useRouter}from"next/navigation"

interface props {
  
  
}

export default function PostForm({}:props){
  // prevent `Enter` key's default
  const
  e =
    (e:React.KeyboardEvent<HTMLInputElement>)=>{
      if(e.key === 'Enter'){
        e.preventDefault()
      }
    },

  r = useRouter(),

  [isPending,setPending] = useState(false),

  _put = async(e:FormEvent<HTMLFormElement>)=>{
    setPending(true)
    e.preventDefault()
    const data = Object.fromEntries(
      (new FormData(e.currentTarget)).entries()
    ) as Record<string, string>
    console.dir(data)
    if(!(data.title.trim()||data.name.trim()||data.bull.trim())){
      setPending(false)
      return void 1
    }
    const res = await put(data)

    res ? (()=>{
          setPending(false)
          alert("Failed to post.\nPlease contact Thisoe with your visitor ID: "+res)
        })()
    : r.push('gesipan')
  }

  return <form id="post"
  onSubmit={_put}
  className={isPending?'pending':''}
  >
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