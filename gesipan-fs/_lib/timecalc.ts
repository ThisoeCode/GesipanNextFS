export const timeDiff = ($uts:number)=>{
  const
  now = Math.floor(Date.now() / 1000),
  seconds = now-$uts,
  units=[
    { unit:'year', s:31536000 },
    { unit:'month', s:2592000 },
    { unit:'day', s:86400 },
    { unit:'hr', s:3600 },
    { unit:'min', s:60 },
    { unit:'s', s:1 },
  ]

  if(seconds<5){return 'just now'}

  for(const{unit,s} of units){
    const x = Math.floor(seconds / s)
    if(x>=1){
      return `${x} ${unit}${x>1&&unit!='s' ? 's':''}${['hr','min','s'].includes(unit)?'':' ago'}`
    }
  }
  return 'just now'
}

export const unixToDate=($uts:number)=>{
  const dt = new Date($uts*1000),
  months=['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sep.','Oct.','Nov.','Dec.']
  return{
    yr: dt.getFullYear(),
    mo: dt.getMonth(),
    d: dt.getDate(),
    h: dt.getHours(),
    m: dt.getMinutes(),
    s: dt.getSeconds(),
    shortMonth: months[dt.getMonth()],
  }
}