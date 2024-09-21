'use client'
import{cmtFormat}from"@/_lib/conf"
import{timeDiff}from"@/_lib/timecalc"
import React,{useState}from"react"

export function AddCmt(){
  const[isFocused,setFocus]=useState(false)
  return<i id="newcomment" className="newcomment">
    <h3>Comment</h3>
    <textarea
      id="c-content"
      style={isFocused?{height:'48pt'}:{}}
      placeholder="Add a comment..."
      onFocus={()=>{isFocused||setFocus(true)}}
    ></textarea>
    <div style={isFocused?{}:{display:'none'}}>
      <input type="text" id="c-name" placeholder="Name..."/>
      <button id="c-sub">Send</button>
    </div>
  </i>
}

export function Acmt({row}:{row:cmtFormat}){
  const no = row.no

  return<div className="a-cmt">
    <hr className="rep-hr" />
    <h5>
      <span>{row.n}</span>
      <span>{timeDiff(row.dt)}</span>
    </h5>
    <p>{row.c.split('\n').map((line,idx)=>(
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ))}</p>
    <button className="reply-btn" id={`rep-${no}`}>Reply</button>
    <i className="newcomment cmt-the-cmt" style={{ display: 'none' }}>
      <textarea id={`ctc-content-${no}`} placeholder="Reply..."/>
      <div>
        <input id={`ctc-name-${no}`} type="text" placeholder="Name..."/>
        <button className="ctc-send-btn">Send</button>
      </div>
    </i>
  </div>
}