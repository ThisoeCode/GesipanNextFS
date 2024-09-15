export default function _(){
  const e =
    (e:React.KeyboardEvent<HTMLInputElement>)=>{
      if(e.key === 'Enter'){
        e.preventDefault()
      }
    }
  return <form id="post"
    action="_serv/api.php"
    method="post"
  >
    <input
      id="posttitle"
      type="text"
      name="title"
      placeholder="Bulletin Title"
      onKeyDown={e}
    /><hr/>
    <input
      id="postname"
      type="text"
      name="name"
      placeholder="Author Name"
      onKeyDown={e}
    /><hr/>
    <textarea
      name="bull"
    ></textarea>
    <input value=""
      id="postsubmit"
      type="submit"
      title="Post Bulletin"
    />
  </form>
}