import{LinkProps as L}from"next/link"
import{Metadata as M}from"next"
import{z}from"zod"

class Thisoe {
  static form = z.object({
    title: z.string(),
    sign: z.string(),
    rich: z.string().trim(),
  })
  static z = z.object({})
}

namespace Thisoe{
  /** Components */
  namespace C{
    type Child = {children:React.ReactNode}
    type LinkProps = L
    type Metadata = M
    type form = z.infer<typeof Thisoe.form>
  }
  /** `serv` */
  namespace S{

  }
}

export default Thisoe