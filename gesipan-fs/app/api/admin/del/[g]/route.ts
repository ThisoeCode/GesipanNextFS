import{NJ,servTitle as _t}from"@/_lib/logsys"
import type{NextRequest}from"next/server"
import{mainDB,cmtDB}from"@/_lib/_insu"
import{DEL}from"@/_lib/conf"

export async function POST(req:NextRequest,{params}:{params:{g:string}}){
  const
    cmt = req.nextUrl.searchParams.get('cmt'),
    g = params.g

// DELETE A POST
  if(!cmt){
    try{
      const
        resMain = await(await mainDB)
          .deleteOne({g}),
        resCmt = await(await cmtDB)
          .deleteMany({g}),
        pro='ADMIN_DEL_GESIMUL'
      if(resMain.deletedCount===1){
        console.log(`[${_t.t2+pro} 201] Deleted docu [g::${g}] and its ${resCmt} replies.`)
        return NJ({del:1, delCmtCount:resCmt.deletedCount} as DEL)
      }
      _t.t500(pro)
      return _t.NJ500
    }catch(_){
      _t.t500('ADMIN_DEL_GESIMUL_UNEXPECTED')
      return _t.NJ500
    }
  }

// DELETE A CMT
  const
    delCount = {count:0,grand:false},
    /** Delete the reply and all its descendants. */
    delCmtDesc = async(no:string)=>{
      await(await cmtDB)
        .deleteOne({no})
      const children = await(await cmtDB)
        .find({tocmt:no}).toArray()
      delCount.grand ? delCount.count++ : delCount.grand=true
      for(const child of children) delCmtDesc(child.tocmt)
    }
  try{
    await delCmtDesc(g)
    console.log(`[${_t.t2+'ADMIN_DEL_REPLY'} 201] Deleted cmt [no::${g}] and its ${delCount.count} descendant replies.`)
    return NJ({del:1, delCmtCount: delCount.count} as DEL)
  }catch(_){
    _t.t500('ADMIN_DEL_GESIMUL_UNEXPECTED')
    return _t.NJ500
  }
}