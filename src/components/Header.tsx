import React, { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom'

const user={_id:"123",role:"admin"};
function Header() {
    const [isOpen,setIsOpen]=useState<boolean>(false)

    function logoutHandler()
    {
        setIsOpen(false)
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
                    <button onClick={logoutHandler}><FaSignOutAlt/></button>
                </div>
            </dialog>
            </>
        ):(<Link to={"/login"}>
            <FaSignInAlt/>
        </Link>)
    }
    </nav>
  )
}

export default Header
