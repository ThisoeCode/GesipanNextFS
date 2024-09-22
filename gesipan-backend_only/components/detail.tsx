import{mainFormat}from"@/_lib/conf"
import{unixToDate}from"@/_lib/timecalc"
import{Acmt,AddCmt}from"./cmt"


export default function Detail({data}:{data:mainFormat}){
  // Time convert
  const d = unixToDate(data.dt)
  const dt = `${d.shortMonth} ${d.d}, ${d.yr}　${d.h}:${d.m}:${d.s}`

  // Load Comments

  // TODO 
  let cmts
  if(1/*have comments*/)cmts=<i id="listcomments">
    <Acmt row={{c:'oh',n:'Thisoe',dt:1726947000,no:'1'}}/>
  </i>

  return <>
    <article>
      <h1>{data.t}</h1>
      <h2>{data.n}</h2>
      <i id='dt'>{dt}</i>
      <p id='maintxt' style={{whiteSpace:'pre-wrap'}}>{data.c}</p>
    </article>

    <section id="comment"><hr id="chr"/>
      <AddCmt/>
      {cmts}
    </section>
  </>
}