import{cookies}from"next/headers"
import{SignJWT,jwtVerify,JWTPayload}from"jose"
import{TGID}from"./conf"

const // config
  expire_hrs = 9,

  {ADMIN_KEY}=process.env
  if(!ADMIN_KEY){ // TS mustdo
    throw new Error('[THISOE🩵DEBUG] Missing environment variables at `admin.ts`.')
  }

const
  key = new TextEncoder().encode(ADMIN_KEY),
  expires = new Date(Date.now() + expire_hrs*60*60*1000),
  alg = "HS256"

async function encrypt(payload:JWTPayload){
  return await new SignJWT(payload)
    .setProtectedHeader({alg})
    .setIssuedAt()
    .setExpirationTime(expire_hrs+" sec from now")
    .sign(key)
}

async function decrypt(input:string){
try{
  const {payload} = await jwtVerify(input,key,{
    algorithms: [alg],
  })
  return payload
}catch(_){
  interface JWTError extends Error {code?:string}
  const e = _ as JWTError
  e.code==='ERR_JWT_EXPIRED'
  return null
}
}



export async function getSession(){
  const session = cookies().get("session")?.value
  if(!session) return null
  return await decrypt(session)
}

export async function login(admin:string){
  // Create session
  const session = await encrypt({session:TGID(),admin,expires})
  // Save session in cookie
  cookies().set("session",session,{
    expires,
    httpOnly:true,
  })
}

/** Destroy session */
export async function logout(){
  cookies().set("session","",{
    expires: new Date(0),
  })
}