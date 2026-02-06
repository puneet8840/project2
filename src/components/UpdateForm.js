import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { getUser } from "../services/userApi"
import useUpdate from "../hooks/updateUser"

import { fields } from "../config/userFields"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { FaArrowLeft } from "react-icons/fa"
const UpdateForm=()=>{
    const [isUpdated,setIsUpdated]=useState(false)
const {id}=useParams()
const [loading,setLoading]=useState(false);
const [user,setUser]=useState({})
const {updateUser,updating,err}=useUpdate()

useEffect(()=>{


    const fetchData=async ()=>{
setLoading(true)
try{
        const data=await getUser()
        
        const foundUser=data.find((user)=>user.id===Number(id))
if(!foundUser) throw Error('not found')
            setUser(foundUser)
        }
      
        
    
    
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    }
    fetchData();
},[id])


const { values, errors, touched, handleSubmit, getFieldProps } = useFormik({ enableReinitialize: true,
    initialValues: { firstname:user.firstname||'', lastname:user.lastname||'', phonenumber:user.phonenumber||'', email:user.email||'' },
    onSubmit: async (values,{resetForm}) => {
    console.log(values)
    const status=await updateUser({id,...values},id)
    setIsUpdated(status)

    resetForm()
  
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("required").matches(/^[a-zA-z]{1,10}$/),
      lastname: Yup.string().required("required").matches(/^[a-zA-z]{1,10}$/),
      email: Yup.string().email("invalid email").required("required"),
      phonenumber: Yup.string()
        .matches(/^[0-9]{10}$/, "should have 10 digits")
        .required("number is required"),
    }),
  });


if(!user||Object.keys(user).length === 0) return (<><div className="min-h-screen flex flex-col items-center justify-center"><p> User not exists</p>   <Link className="px-8 py-4 bg-blue-300" to='/'>Go Back{` `}<FaArrowLeft/></Link></div></>)
    
return !loading && Object.keys(user).length>0 && (



<>
{updating && <p>updating</p>}
{isUpdated && <p>updated</p>}
{err &&<p>something went wrong</p>}
<form
            className="flex flex-col items-center space-y-10"
            onSubmit={handleSubmit}
          >
            {fields.map((field) => (
              <div
                key={field.name}
                className="space-y-2 relative flex  justify-center space-x-2 items-center"
              >
                <label className="block font-medium">{field.label}</label>
                <input
                  className={
                    touched[field.name] && errors[field.name] ? "text-red-500" : ""
                  }
                  value={values[field.name]}
                  type={field.type}
                  {...getFieldProps(field.name)}
                 
                />
                {touched[field.name] && errors[field.name] && (
                  <p className="font-semibold absolute right-0 -top-6 text-red-500 text-center italic">
                    Wrong  value
                  </p>
                )}
              </div>
            ))}
    <div className="flex space-x-2 p-2"><button type="submit" className="px-8 py-4 bg-blue-300">
              Update
            </button>
            <Link className="px-8 py-4 bg-blue-300" to='/'>Go Back{` `}<FaArrowLeft/></Link>
            
           </div>
            
          </form>
     
          </>
)
    

}


export default UpdateForm