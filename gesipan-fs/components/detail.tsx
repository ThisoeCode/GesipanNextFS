import{API,cmtFormat,mainFormat}from"@/_lib/conf"
import{unixToDate}from"@/_lib/timecalc"
import{Acmt,AddCmt}from"./cmt"
import{DelRowBtn}from"./_use_client"


export default async function Detail({g,data,admin=false}:{
  g:string,
  data:mainFormat,
  admin?:boolean,
}){
  // Time convert
  const
  d = unixToDate(data.dt),
  dt = `${d.shortMonth} ${d.d}, ${d.yr}　${d.h}:${d.m}:${d.s}`,

  // Load Comments
  cmtData:{thisoe:number,docs:cmtFormat[]} = await(
    await fetch(API+'cmt/get?g='+g,{
      method: 'GET',
      cache: 'no-store',
    })
  ).json(),

  a=admin?'admin':void'',

  cmts:JSX.Element[] = [],
  L=cmtData.docs.length
  if(cmtData.thisoe==200&&L){
    cmtData.docs.forEach((v,i)=>{
      cmts.push(<Acmt admin={admin}
        key={'k'+i}
        row={{g, c:v.c, n:v.n, dt:v.dt, no:v.no, ctc_count:v.ctc_count}}
      />)
    })
  }

  return <>
    <article className={a}>
      {admin&&<DelRowBtn g={g} txt="Delete Post"/>}
      <h1>{data.t}</h1>
      <h2 title={"Post Author: "+data.n}>{data.n}</h2>
      <i  title={"Time Posted:  "+dt.replace("　",'  at ')} id='dt'>{dt}</i>
      <p id='maintxt' style={{whiteSpace:'pre-wrap'}}>{data.c}</p>
    </article>

    <section id="comment" className={a}>
      {admin||<><hr id="chr"/><AddCmt g={g}/></>}
      <i id="listcomments" style={{display:L?'flex':'none'}}>
        {cmts}
      </i>
    </section>
  </>
}