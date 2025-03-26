import React, { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom'
import { User } from '../types/types';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';


interface PropsType {
   user:User|null;
}

function Header({user}:PropsType) {
    const [isOpen,setIsOpen]=useState<boolean>(false)

   async function logoutHandler()
    {
        try 
        {
            await signOut(auth)
            toast.success("Sign Out Successfully")
            setIsOpen(false)
        } 
        catch (error) 
        {
            toast.error("Sign Out Failed")
            console.log(error); 
        }
    }
  return (
    <nav className='header'>
    <Link onClick={()=>{setIsOpen(false)}} to={"/"}>HOME</Link>
    <Link onClick={()=>{setIsOpen(false)}}  to="/search"><FaSearch title='Search'/>{" "}</Link>
    <Link onClick={()=>{setIsOpen(false)}} to={"/cart"}><FaShoppingBag title='Cart'/>{" "}</Link>
    {
        user?._id?(
            <>
            <button onClick={()=>{setIsOpen((pre)=>!pre)}}><FaUser/></button>
            <dialog open={isOpen}>
                <div>
                    {
                        user.role==="admin"&&(
                            <Link onClick={()=>{setIsOpen(false)}} to="/admin/dashboard">Admin</Link>
                        )
                    }
                    <Link onClick={()=>{setIsOpen(false)}} to="/orders">Orders</Link>
                    <button onClick={logoutHandler}><FaSignOutAlt title='Logout'/>{" "}</button>
                </div>
            </dialog>
            </>
        ):(<Link to={"/login"}>
            <FaSignInAlt title='Login'/>{" "}
        </Link>)
    }
    </nav>
  )
}

export default Header
