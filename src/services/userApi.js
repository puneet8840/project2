const postUser=async (user)=>{
try{
  const res=await fetch('https://my-json-server.typicode.com/puneet8840/DB/users',{method:'POST',body:JSON.stringify(user),headers:{"Content-Type":'application/json'}})

if(res.ok) return true
else throw Error('internal server error')
}
catch(err){
throw Error("something went wrong")

}




}



const getUser=async ()=>{
try{
  const res=await fetch(`https://my-json-server.typicode.com/puneet8840/DB/users/`)
  const data=await res.json()

if(res.ok) return data
else throw Error('internal server error')
}
catch(err){
throw Error("something went wrong")

}




}


export {postUser,getUser}