import Arow from"@/components/arow"
import{API,Load}from"@/_lib/conf"

export default async function Atable(
  {sp,admin}: {sp?:{posted?:string},admin?:boolean}
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
            admin={admin}
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
  }, (sp?.posted??0)?900:1 )}))

  return <i id="table">
    <i id="th" className="tr">
      <p></p>
      <p>Title</p>
      <p>Announcer</p>
      <p>Date</p>
    </i>
    {list}
  </i>
}