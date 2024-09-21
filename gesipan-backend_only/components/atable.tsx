import Arow from"@/components/arow"
import{API,Load}from"@/_lib/conf"

export default async function Atable(){
  const list:Promise<JSX.Element[]> = (async ()=>{
    const rows:JSX.Element[] = []
    const data:Load = await(
      await fetch(API+'load',{
        method: 'GET',
        cache: 'no-store',
      })).json()
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
    return rows
  })()

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