'use client'

import Image from "next/image"
import{Form,FormControl,FormField,FormItem,FormMessage}from"@/components/ui/form"
import{Button}from"@/components/ui/button"
import{Input}from"@/components/ui/input"
import{useForm}from"react-hook-form"
import T from "@/lib/Types.d"
import{zodResolver}from'@hookform/resolvers/zod'

export default function PostForm({api}:{api:string}){

  const form = useForm<T.C.form>({
    mode:'onChange',
    // defaultValues:{
    //   title:'No Title',
    //   sign:'Anonymous',
    //   rich:'This post has no content.',
    // },
    resolver: zodResolver(T.form),
  })

  if(api==='admin'){
    // ...
  }

  return <>
    <Form {...form}><form id='post-form'>
      <FormField
        control={form.control}
        name="title"
        render={({field})=>(
          <FormItem>
            <FormControl>
              <Input placeholder="Bulletin Title" {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sign"
        render={({field})=>(
          <FormItem>
            <FormControl>
              <Input placeholder="Author Name" {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rich"
        render={({field})=>(
          <FormItem>
            <FormControl>
              <Input placeholder="Content..." {...field} />
              {/* TODO change to tiptap */}
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <Button type="submit">
      <Image src={'streamline-send-178577.svg'} width={39} height={39} alt='Submit'/>
      </Button>
    </form></Form>
  </>
}