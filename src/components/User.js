import { useState } from "react";
import { FaArrowRight, } from "react-icons/fa";
import { MdClose } from 'react-icons/md';
import { FaArrowLeft } from "react-icons/fa";


const User=({user})=>{
    const data=Object.entries(user).slice(1)
    const [deleted,setDeleted]=useState(false)

    const handleBack=()=>{

        setDeleted(pre=>setDeleted(false))
    }

    const handleDelete=async ()=>{

        try{

            const res=await fetch(`https://my-json-server.typicode.com/puneet8840/DB/users/${user.id}`,{method:"DELETE"})
            if(res.ok) setDeleted(true)
            else{
        throw Error('something went wrong')}

        }
        catch(err){

            console.log(err)
        }




    }

return (

    <>

    {deleted && (<div className="fixed left-0 z-10 bg-blue-300  right-0 top-0 bottom-0 flex justify-center items-center">

        <div className="bg-blue-400 flex items-center justify-center space-x-10 text-white rounded-lg z-10 p-20"><span className="animate-bounce text-4xl text-red-500">deleted!</span> <div onClick={handleBack} className="px-8 py-4 cursor-pointer bg-blue-300" >Go Back{` `}<FaArrowLeft/></div></div>
    </div>)}
   <div className="relative grid grid-cols-1 md:col-span-2 md:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] gap-1">
  {data.map((property, index) => (
    <div key={index} className="  flex p-1 space-x-1 ">
        <button onClick={handleDelete} className="absolute flex justify-center rounded-full  -left-3 top-2 p-1 bg-red-400 "><MdClose size={15}/></button>
      <div className="border-2 p-2 text-white bg-gradient-to-r from-cyan-300 to-red-400">
        {property[0]}
      </div>
      <FaArrowRight className="mt-2 text-red-200 flex-shrink-0"/>
      <div className="border-2 p-2 text-white bg-gradient-to-r from-cyan-300 to-red-400">{property[1]}</div>
    </div>
  ))}
</div>
    
    </>
)





}

export default User;