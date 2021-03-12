import { useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const {id}=useParams();
    const {data:blog, isPending, error}=useFetch('http://localhost:8000/blogs/'+id);
    const [isPendingDelete,setIsPendingDelete]=useState(false);
    const [errorDelete, setErrorDelete]=useState(null);
    const history=useHistory();

    const handleDelete=()=>{

        const deleteData=async()=>{
            setIsPendingDelete(true);
            try{
                const res=await fetch('http://localhost:8000/blogs/'+id,{
                    method: 'DELETE'
                });
                if(!res.ok){
                    throw Error('Can not delete the required data');
                }
                else{
                    setIsPendingDelete(false);
                    setErrorDelete(null);
                    history.push('/');
                }
            }
            catch(err){
                setIsPendingDelete(false);
                setErrorDelete(err.message);
                setTimeout(()=>setErrorDelete(null),3000);
            }
        }
        deleteData();
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <div className="blog-header">
                        <div className="blog-info">
                            <h2>{blog.title}</h2>
                            <p>Written by {blog.author}</p>
                        </div>
                        <div className="delete-blog">
                            {!isPendingDelete && <button onClick={handleDelete}>Delete</button>}
                            {isPendingDelete && <button disabled>Deleting...</button>}
                            <div className={'pop-message'+ ((errorDelete)?' pop-show':'')}>{`${errorDelete}. Try later.`}</div>
                        </div>
                    </div>
                    <div>{blog.body}</div>                    
                </article>
            )}
        </div>

    );
}
 
export default BlogDetails;