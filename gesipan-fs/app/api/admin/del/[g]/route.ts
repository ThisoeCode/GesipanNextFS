import{NJ,servTitle as _t}from"@/_lib/logsys"
import type{NextRequest}from"next/server"
import{mainDB,cmtDB}from"@/_lib/_insu"
import{DEL}from"@/_lib/conf"

export async function GET(req:NextRequest,{params}:{params:{g:string}}){
  const
    cmt = req.nextUrl.searchParams.get('cmt'),
    g = params.g

// DELETE A POST
if(cmt===null){
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
    console.log(await(await mainDB).find({g}).toArray())
    console.error('Deleting ID: '+g)
    console.error('Deleted doc: '+resMain.deletedCount)
    console.log('Deleted cmd: '+resCmt.deletedCount)
    return _t.NJ500
  }catch(_){
    _t.t500('ADMIN_DEL_GESIMUL_UNEXPECTED')
    console.error('Caught:\n'+_)
    return _t.NJ500
  }
}

// DELETE A CMT
if(cmt==='1'){
  const

    /** Flag obj: count the deletion of descendant replies. */
    delCount = {count:0,grand:false},

    /** Delete the reply and all its descendants. */
    delCmtDesc = async(no:string)=>{
    // minus
      const self = await(await cmtDB).findOne({no})
      if(!self) return null
    // delete `no`
      const
        del = await(await cmtDB)
          .deleteOne({no}),
        children = await(await cmtDB)
          .find({tocmt:no}).toArray()
      del.deletedCount &&
        await(await cmtDB).updateOne(
          {no: self.tocmt},
          {$inc: {ctc_count: -1}}
        )
    // delete descendants
      delCount.grand ? delCount.count++ : delCount.grand=true
      console.log('------- ',delCount.count)
      if(children.length===0) return delCount.count
      for(const child of children) await delCmtDesc(child.no)
      return delCount.count
    }

///////
  try{
    const delCmtCount = await delCmtDesc(g)
    if(delCmtCount===null) return _t.t422('ADMIN_DELETE_API_02')
    if(delCmtCount===undefined) return _t.NJ500
    console.log(`[${_t.t2+'ADMIN_DEL_REPLY'} 201] Deleted cmt [no::${g}] and its ${delCmtCount} descendant replies.`)
    return NJ({del:1, delCmtCount} as DEL)
  }catch(_){
    _t.t500('ADMIN_DEL_GESIMUL_UNEXPECTED')
    console.error('Caught:\n'+_)
    return _t.NJ500
  }
}

// 422
  else{return _t.t422('ADMIN_DELETE_API_01')}
}