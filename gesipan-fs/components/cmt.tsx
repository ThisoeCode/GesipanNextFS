'use client'
import{API,cmtFormat}from"@/_lib/conf"
import{timeDiff}from"@/_lib/timecalc"
import React,{useState,ChangeEvent as e,useRef,useEffect, Fragment}from"react"
import{put}from"./_use_serv"
import{DelCmt}from"./_use_client"

type CTT = HTMLTextAreaElement
type INPUT = HTMLInputElement
const failmsg = "Failed to post reply.\nPlease contact Thisoe with your visitor ID: "



/** 1. Add Comment */

export function AddCmt({g}:{g:string}){
  const[isFocused,setFocus]=useState(false),
  [isPending,setPending]=useState(false),
  [cmtData,setCtt]=useState(''),
  [nameData,setName]=useState(''), // TODO : Default value as cookie::name !!!CTRL+F : 2 places!!!

  ch={
    ctt: (e:e<CTT>)=>{setCtt(e.target.value)},
    name:(e:e<INPUT>)=>{setName(e.target.value)}
  },

  _put = async()=>{
    if(isPending){// prevent multi-put
      return void 1
    }else{setPending(true)}

    const cmt = {cmt_ctt:cmtData,cmt_name:nameData}
    if(!(cmt.cmt_ctt.trim()||cmt.cmt_name.trim())){
      return void 1
    }
    const res = await put({cmt,g},'cmt/put')

    res ? (()=>{
          setPending(false)
          alert(failmsg+res)
        })()
    : setTimeout(()=>window.location.reload(),233)
  }

  return<i id="newcomment" className="newcomment">
    <h3>Comment</h3>
    <textarea
      id="c-content"
      style={isFocused?{height:'48pt'}:{}}
      placeholder="Add a comment..."
      onFocus={()=>{isFocused||setFocus(true)}}
      onChange={ch.ctt}
    ></textarea>
    <div style={isFocused?{}:{display:'none'}}>
      <input type="text"
        id="c-name"
        placeholder="Name..."
        onChange={ch.name}
        disabled={isPending}
      />
      <button id="c-sub" onClick={_put}>Send</button>
    </div>
  </i>
}



/** 2. A comment */

export function Acmt({row,admin}:{row:cmtFormat,admin:boolean}){
  const no = row.no,
  [isPending,setPending]=useState(false),
  [cttData,setCtt]=useState(''),
  [nameData,setName]=useState(''), // TODO : Default value as cookie::name !!!CTRL+F : 2 places!!!
  [isReplying,setReply]=useState(false),


  ch={
    ctt: (e:e<CTT>)=>{setCtt(e.target.value)},
    name:(e:e<INPUT>)=>{setName(e.target.value)}
  },

  _put = async()=>{
    const ctcData = {ctc_ctt:cttData,ctc_name:nameData,g:row.g}
    if(!(ctcData.ctc_ctt.trim()||ctcData.ctc_name.trim())){
      return null
    }
    setPending(true)
    const res = await put(ctcData,'cmt/put/'+no)

    res ? (()=>{
          setPending(false)
          alert(failmsg+res)
        })()
    : window.location.reload()
  },

  replyRef=useRef<HTMLTextAreaElement>(null),
  openReply=()=>{
    setReply(true)
  }
  useEffect(()=>{
    replyRef.current&&isReplying&&replyRef.current.focus()
  }, [isReplying])

  return<div className="a-cmt">
    <hr className="rep-hr"/>
    {admin&&<DelCmt no={no}>Delete Reply</DelCmt>}
    <h5>
      <span>{row.n}</span>
      <span>{timeDiff(row.dt)}</span>
    </h5>
    <p>{row.c.split('\n').map((line,j)=>(
      <React.Fragment key={j}>
        {line}
        <br/>
      </React.Fragment>
    ))}</p>
    {admin||<>
    <button
      className="reply-btn"
      style={isReplying?{display:'none'}:{}}
      onClick={openReply}
    >Reply</button>
    <i className="newcomment cmt-the-cmt" style={{display:isReplying?'block':'none'}}>
      <textarea ref={replyRef}
        placeholder="Reply..."
        name="ctc_ctt"
        onChange={ch.ctt}
        disabled={isPending}
      />
      <div>
        <input type="text"
          placeholder="Name..."
          name="ctc_name"
          onChange={ch.name}
          disabled={isPending}
        />
        <button onClick={_put} disabled={isPending}>Send</button>
      </div>
    </i>
    </>}
    <ShowCtc count={row.ctc_count} under={no} admin={admin}/>
  </div>
}



/** 3. Show more replies */
function ShowCtc({count,under,admin}:{count:number,under:string,admin:boolean}){
  const
    init_store:{thisoe:number,docs:cmtFormat[]}={thisoe:0,docs:[{no:'0',g:'',n:'',c:'',ctc_count:0,dt:0}]},
    [show,setCtt]=useState(false),
    [display,dispCtc]=useState('none'),
    [data,store]=useState(init_store),
    [isPending,pend]=useState(false),

    /** @param _ Is `show` btn? */
    toggle=(_:boolean)=>{return async()=>{
      if(data.docs[0].dt===0){ // Load CTCs
        pend(true)
        const _get = await(
          await fetch(API+`cmt/get/${under}/`,{
            method: 'GET',
            cache: 'no-store',
          })
        ).json()
        store(_get)
        dispCtc('flex')
        pend(false)
      }
      else dispCtc(_?'flex':'none')
      setCtt(_)
    }},

    showPend=()=>{
      if(isPending){return'Loading...'}
      return<>
        <span className="arr-down"/>Show {count} repl{count===1?'y':'ies'}
      </>
    }


  if(count===0){return <></>}
  return <>
    <button
      className="show-ctc-btn"
      style={{display:show?'none':'block'}}
      onClick={toggle(true)}
      disabled={isPending}
    >{showPend()}</button>
    <button
      className="hide-ctc-btn"
      style={{display:show?'block':'none'}}
      onClick={toggle(false)}
    ><span className="arr-up"/>Hide</button>
    <Actc display={display} data={data.docs} admin={admin}/>
  </>
}



/** 4. A reply */
function Actc({display,data,admin}:
  {display:string,data:cmtFormat[],admin:boolean}
){
  const
  rows:JSX.Element[] = []
  data.forEach((v,i)=>{
    rows.push(<Acmt admin={admin}
      key={'k'+i}
      row={{g:'', c:v.c, n:v.n, dt:v.dt, no:v.no, ctc_count:v.ctc_count}}
    />)
  })

  return <i className="r-cmt" style={{display}}>
    <hr className="r-hr"/>
    <i className="r-children">
      {rows}
    </i>
  </i>
}