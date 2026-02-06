import {useState} from 'react';
import { postUser } from '../services/userApi';


const useSubmit=()=>{
 const [loading,setLoading]=useState(false);
 const [err,setError]=useState(null);

 const submitForm=async (values)=>{

try{
    setLoading(true)
    const res=await postUser(values)
    if(res) return true

}
catch(err){
    console.log(err.message)
    setError(err)
    return false
}
finally{
    setLoading(false)
}


 }


 return {submitForm,loading,err}








}

export default useSubmit;