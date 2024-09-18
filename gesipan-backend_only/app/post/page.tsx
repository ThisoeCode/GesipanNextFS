'use client'
import{useActionState,useEffect}from"react"
import _serv from"./_use_serv"

export default function _(){
  const e =
    (e:React.KeyboardEvent<HTMLInputElement>)=>{
      if(e.key === 'Enter'){
        e.preventDefault()
      }
    }

    /** TODO : what is initstat? */
    const initStat = null
    const[err,action,isPending]=useActionState(_serv,initStat)

    useEffect(()=>{
      err&&alert(err)
    },[err])

  return <form action={action} id="post">
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
    <textarea
      name="bull"
    ></textarea>
    <input value=""
      id="postsubmit"
      type="submit"
      title="Post Bulletin"
      className={isPending?'ps_ispending':undefined}
      disabled={isPending}
    />
  </form>
}