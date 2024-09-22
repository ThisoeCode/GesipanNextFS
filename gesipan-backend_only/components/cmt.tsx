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
  const no = row.no,
  [isPending,setPending] = useState(false),
  [ctcData,setCtc] = useState({'ctc-cct':'','ctc-name':''}),

  handleChange = (e:React.ChangeEvent<
    HTMLInputElement|HTMLTextAreaElement
  >)=>{
    const {name,value} = e.target
    setCtc(prev=>({...prev, [name]: value}))
    console.log(ctcData)
    console.log(isPending)
  },

  _put = async()=>{
    setPending(true)
    // const data = Object.fromEntries(
    //   (new FormData(e.currentTarget)).entries()
    // ) as Record<string, string>
    // console.dir(data)
    // if(!(data.title.trim()||data.name.trim()||data.bull.trim())){
    //   setPending(false)
    //   return void 1
    // }
    // const res = await put(data)

    // res ? (()=>{
    //       setPending(false)
    //       alert("Failed to post.\nPlease contact Thisoe with your visitor ID: "+res)
    //     })()
    // : r.push('gesipan')
  }

  return<div className="a-cmt">
    <hr className="rep-hr"/>
    <h5>
      <span>{row.n}</span>
      <span>{timeDiff(row.dt)}</span>
    </h5>
    <p>{row.c.split('\n').map((line,idx)=>(
      <React.Fragment key={idx}>
        {line}
        <br/>
      </React.Fragment>
    ))}</p>
    <button className="reply-btn" id={`rep-${no}`}>Reply</button>
    <i className="newcomment cmt-the-cmt" style={{ display: 'none' }}>
      <textarea id={`ctc-content-${no}`} placeholder="Reply..." name="ctc-cct" onChange={handleChange}/>
      <div>
        <input id={`ctc-name-${no}`} type="text" placeholder="Name..." name="ctc-name" onChange={handleChange}/>
        <button className="ctc-send-btn" onClick={_put}>Send</button>
      </div>
    </i>
  </div>
}