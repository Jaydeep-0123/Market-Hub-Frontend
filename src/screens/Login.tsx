import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { Fragment, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

function Login()
{
    const [gender,setGender]=useState("");
    const [date,setDate]=useState("");

    const [login]=useLoginMutation();

    const loginHandler=async()=>
    {
        try{
            const provider= new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth,provider);
            const response=await login({
            name:user.displayName!,
            email:user.email!,
            photo:user.photoURL!,
            role:"user",
            gender:gender,
            dob:date,
            _id:user.uid
        });
       
        if("data" in response)
        {
            toast.success(response.data?.message);
        }
        else
        {
          const error=response.error as FetchBaseQueryError; 
          const message=(error.data as MessageResponse).message; 
          toast.error(message)
        }        
      
      }
      catch(error)
      {
         toast.error("Sign In Fail")
          console.log(error);
          
      }
    }
    return <Fragment>
        <div className="login">
            <main>
            <h1>Login</h1>
            <div>
                <label>Gender</label>
                <select name="Gender" value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label>Date of birth</label>
                <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
            <div>
                <p>Already Signed In Once</p>
                <button onClick={()=>{loginHandler()}}>
                 <FcGoogle/> <span>Sign in with Google</span>
                </button>
            </div>
            </main>
        </div>
    </Fragment>
}

export default Login;