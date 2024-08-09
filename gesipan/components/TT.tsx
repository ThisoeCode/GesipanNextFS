'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TT_Toolbar from './TT_Toolbar'
import TT_EditorCtt from './TT_EditorCtt'

export default function TT({
  ctt,
  onChange,
}:{
  ctt:string
  onChange:(rich:string)=>void
}){
  const editor=useEditor({
    extensions: [StarterKit.configure()],
    content: ctt,
    editorProps:{
      attributes:{
        id: 'tiptap'
      }
    },
    // onUpdate({editor}){
    //   onChange(editor.getHTML())
    //   // TODO use the change of `ctt` to do sth
    // }
  })
  return <>
    <div id='tiptap-wrap'>
      <TT_Toolbar e={editor}/>
      <TT_EditorCtt e={editor}/>
    </div>
  </>
}