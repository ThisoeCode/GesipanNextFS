import{mainFormat}from"@/_lib/conf"
import{unixToDate}from"@/_lib/timecalc"
import{Acmt,AddCmt}from"./cmt"


export default function Detail({data}:{data:mainFormat}){
  // Time convert
  const
  g = data.g || '0',
  d = unixToDate(data.dt),
  dt = `${d.shortMonth} ${d.d}, ${d.yr}　${d.h}:${d.m}:${d.s}`

  // Load Comments

  // TODO 
  let cmts
  if(1/*have comments*/)cmts=<i id="listcomments">
    <Acmt row={{g,c:'oh',n:'Thisoe',dt:1726947000,no:'1'}}/>
  </i>

  return <>
    <article>
      <h1>{data.t}</h1>
      <h2 title={"Post Author: "+data.n}>{data.n}</h2>
      <i  title={"Time Posted:  "+dt.replace("　",'  at ')} id='dt'>{dt}</i>
      <p id='maintxt' style={{whiteSpace:'pre-wrap'}}>{data.c}</p>
    </article>

    <section id="comment"><hr id="chr"/>
      <AddCmt g={g}/>
      {cmts}
    </section>
  </>
}