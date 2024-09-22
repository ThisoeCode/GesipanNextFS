import Arow from"@/components/arow"
import{API,GesipanProps,Load}from"@/_lib/conf"

export default async function Atable(
  {searchParams}: GesipanProps
){
  const list:Promise<JSX.Element[]> = (new Promise((resolve)=>{setTimeout( async()=>{
    const rows:JSX.Element[] = [],
    data:Load = await(
      await fetch(API+'load',{
        method: 'GET',
        cache: 'no-store',
      })
    ).json()
    if(data.thisoe===200&&data.docs){
      let L = data.docs.length
      data.docs.forEach((v,i)=>{
        rows.push(
          <Arow
            key={'k'+i}
            no={L}
            title={v.t}
            ann={v.n}
            date={v.dt}
            g={v.g}
          />
        )
        L--
      })
    }else{
      console.error("[THISOE ERROR 0081200]")
      console.dir(data)
      throw new Error('[THISOE ERROR] no.0081200')
    }
    resolve(rows)
  } ,searchParams.posted?900:1)}))

  return <i id="table">
    <i id="th" className="tr">
      <p>Post NO.</p>
      <p>Title</p>
      <p>Announcer</p>
      <p>Date</p>
    </i>
    {list}
  </i>
}