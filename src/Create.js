import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {

    const [title, setTitle]=useState('');
    const [body, setBody]=useState('');
    const [author, setAuthor]=useState('');
    const [isPending, setIsPending]=useState(false);
    const [postError, setPostError]=useState(null);

    const history=useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const blog={title,body,author};
        setIsPending(true);
        const postData=async()=>{
            try{
                const res=await fetch('http://localhost:8000/blogs',{
                    method: 'POST',
                    headers:{'Content-Type' : 'application/json'},
                    body: JSON.stringify(blog)
                });
                if(!res.ok){
                    throw Error('Can not post the required data');
                }
                else{
                    setIsPending(false);
                    setPostError(null);
                    history.push('/');
                }
            }
            catch(err){
                setIsPending(false);
                setPostError(err.message);
                setTimeout(()=>setPostError(null),3000);
            }
        }
        postData();
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label>Author:</label>
                <select
                    required
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option hidden value=""> -- select an option -- </option>
                    <option value="Ahmed">Ahmed</option>
                    <option value="Nasser">Nasser</option>
                    <option value="Zaki">Zaki</option>
                </select>
                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && <button type="submit">Adding...</button>}
                <div className={'pop-message'+ ((postError)?' pop-show':'')}>{`${postError}. Try later.`}</div>
            </form>
        </div>
    );
}
 
export default Create;