import {useState} from 'react';



const useUpdate=()=>{
 const [updating,setUpdating]=useState(false);
 const [err,setError]=useState(null);

 const updateUser=async (values,id)=>{

try{
    setUpdating(true)
    const res=await fetch(`https://my-json-server.typicode.com/puneet8840/DB/${id}`,{method:'PUT',body:JSON.stringify(values),headers:{"Content-Type":'application/json'}})
    if(res) return true

}
catch(err){
    console.log(err.message)
    setError(err)
    return false
}
finally{
    setUpdating(false)
}


 }


 return {updateUser,updating,err}








}

export default useUpdate;