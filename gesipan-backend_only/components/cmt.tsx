'use client'
import{cmtFormat}from"@/_lib/conf"
import{timeDiff}from"@/_lib/timecalc"
import React,{useState,ChangeEvent as e}from"react"
import{put}from"./_use_serv"

type CTT = HTMLTextAreaElement
type INPUT = HTMLInputElement
const failmsg = "Failed to post reply.\nPlease contact Thisoe with your visitor ID: "



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



export function Acmt({row}:{row:cmtFormat}){
  const no = row.no,
  [isPending,setPending]=useState(false),
  [cttData,setCtt]=useState(''),
  [nameData,setName]=useState(''), // TODO : Default value as cookie::name !!!CTRL+F : 2 places!!!


    ch={
      ctt: (e:e<CTT>)=>{setCtt(e.target.value)},
      name:(e:e<INPUT>)=>{setName(e.target.value)}
    },

  _put = async()=>{
    const ctcData = {ctc_ctt:cttData,ctc_name:nameData}
    if(!(ctcData.ctc_ctt.trim()||ctcData.ctc_name.trim())){
      return void 1
    }
    setPending(true)
    const res = await put(ctcData,'cmt/put/'+no)

    res ? (()=>{
          setPending(false)
          alert(failmsg+res)
        })()
    : window.location.reload()
  }

  return<div className="a-cmt">
    <hr className="rep-hr"/>
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
    <button className="reply-btn" /* id={`r-${no}`} */>Reply</button>
    <i className="newcomment cmt-the-cmt" style={{ display: 'none' }}>
      <textarea
        /* id={`ctcctt-${no}`} */
        placeholder="Reply..."
        name="ctc_ctt"
        onChange={ch.ctt}
        disabled={isPending}
      />
      <div>
        <input type="text"
          /* id={`ctcname-${no}`} */
          placeholder="Name..."
          name="ctc_name"
          onChange={ch.name}
          disabled={isPending}
        />
        <button onClick={_put} disabled={isPending}>Send</button>
      </div>
    </i>
  </div>
}