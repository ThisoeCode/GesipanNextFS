'use client'
import{type Editor}from"@tiptap/react"
import{Toggle}from"./ui/toggle"
import { Heading } from "lucide-react"

export default function TT_EditorCtt({e}:{e:Editor|null}){
  if(!e){return null}
  return <>
    <Toggle
      size='sm'
      pressed={e.isActive({/* TODO heading */})}
      onPressedChange={_=>{
        e.chain().focus()
          .toggleHeading({level:1}).run()
      }}
    >
      <Heading />
      {/* toolbox */}
    </Toggle>
  </>
}