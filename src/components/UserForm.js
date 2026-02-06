import { fields } from "../config/userFields";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSubmit from "../hooks/useSubmit";
import { getUser } from "../services/userApi";
import User from "./User";
import {Link,} from 'react-router-dom'


const UserForm = () => {
  const {submitForm,loading,err}=useSubmit();
  const [isSubmitted,setSubmitted]=useState(false)
  const [userData,setUserData]=useState([])

  const { values, errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: { firstname: "", lastname: "", phonenumber: "", email: "" },
    onSubmit: async (values,{resetForm}) => {
    resetForm()
    const status=await submitForm(values)
    setSubmitted(status)
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

  const fetchUser=async ()=>{
try{
    const data=await getUser()
    if(data) setUserData(data)
      return
}

catch(err){
  console.log(err)
}

}

  return (
    <>
    
    {loading && (<p>submitting form</p>)}
    {err && (<p>something went wrong</p>)}
    {isSubmitted && (<p>congrats its done</p>)}
    <p className="italic text-base text-red-900 text-center">After deleting records, please refersh the page to see updated data, for deleting a record kindly click left cross icon for each record</p>
      <p className="italic text-base  text-red-900 text-center">for creating user, please fill the form and submit, you can get submitted data by clicking on  <span className="inline-block animate-bounce text-slate-900">Get User</span> button</p>
      <p className="text-2xl font-bold text-red-900 mb-10 text-center animate-pulse">Kindly Note For Create, Update and Delete, operations are fake, we are using mock JSON server</p>
    
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
          submit!
        </button>
        <button type="button" onClick={fetchUser} className="px-8 py-4 bg-blue-300">
          Get User
        </button>
       </div>
        
      </form>
      
      
            <section id='users' className="mt-10">
<div className="container max-w-6xl mx-auto">
  <div className="flex flex-col space-y-1 divide-y-2">
     


    {userData.length > 0? userData.map((user)=>(<div className="grid   grid-cols-1 md:grid-cols-2  md:grid-rows-2" key={user.id}><User  user={user} /> <Link className="text-blue-500 text-center col-span-2 h-10 md:h-full bg-cyan-200 underline p-2 border   hover:text-red-500 font-semibold " to={`/users/${user.id}`}>Update</Link></div>)):<p className="text-red-500">No data available</p>}
  </div>



</div>



            </section>

          
          
    </>
  );
};

export default UserForm;
