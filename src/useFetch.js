import { useEffect, useState } from "react";

const useFetch=(url)=>{
    const [data,setData]=useState(null);
    const [isPending, setIspending]=useState(true);
    const [error, setError]=useState(null);

    useEffect(()=>{
        const abortConst=new AbortController();
        const fetchData=async()=>{
            try{
                const res=await fetch(url,{signal:abortConst.signal});
                if(!res.ok){
                    throw Error('Can not fetch the required data');
                }
                else{
                    const data=await res.json();
                    setData(data);
                    setIspending(false);
                    setError(null);
                }
            }
            catch(err){
                if(err.name!=="AbortError"){
                    setData(null);
                    setIspending(false);
                    setError(err.message);
                }
            }
        }
        fetchData();
        return ()=>abortConst.abort();
    },[url]);
    return {data, isPending, error};
}

export default useFetch;