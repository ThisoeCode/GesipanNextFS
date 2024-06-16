'use client'

import{Form,FormControl,FormField,FormItem,FormMessage}from"@/components/ui/form"
import{Button}from"@/components/ui/button"
import{Input}from"@/components/ui/input"
import{useForm}from"react-hook-form"
import T from "@/lib/Types.d"
import{zodResolver}from'@hookform/resolvers/zod'

export default function RichForm({api}:{api:string}){

  const form = useForm<T.C.form>({
    mode:'onChange',
    defaultValues:{
      title:'No Title',
      sign:'Anonymous',
      rich:'This post has no content.',
    },
    resolver: zodResolver(T.form),
  })

  if(api==='admin'){
    // ...
  }

  return <>
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({field})=>(
            <FormItem>
              <FormControl>
                <Input placeholder="Title..." {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </>
}