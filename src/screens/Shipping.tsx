import React, { ChangeEvent, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function Shipping() {
  const navigate=useNavigate();
    const [shippingInfo,setShippingInfo]=useState({
        address:"",
        city:"",
        state:"",
        country:"",
        pincode:""
    })

    const changeHandler=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setShippingInfo((prev)=>({...prev,[e.target.name]: e.target.value}))
    }
  return (
    <div className='shipping'>
     <button className='back-btn' onClick={()=>{navigate("/cart")}}><BiArrowBack/></button>
     <form action="">

        <h1>Shipping Address</h1>

        <input 
         type='text' 
         placeholder='Address' 
         name='address' 
         value={shippingInfo.address} 
         required 
         onChange={changeHandler}/>

        <input 
         type='text' 
         placeholder='City' 
         name='city' 
         value={shippingInfo.city} 
         required 
         onChange={changeHandler}/>

        <input 
         type="text" 
         placeholder='State'
         name='state' 
         value={shippingInfo.state} 
         required 
         onChange={changeHandler}/>
         
        {/* <input 
         type='text' 
         placeholder='Country' 
         name='country' 
         value={shippingInfo.country} 
         required 
         onChange={changeHandler}/> */}

         <select 
          name="country" 
          required 
          value={shippingInfo.country} 
          id=""
          onChange={changeHandler}
          >
         <option value="">Choose Country</option>   
         <option value="india">India</option>   
          </select>

         <input 
          type='number'
          placeholder='Pincode'
          name='pincode'
          value={shippingInfo.pincode}
          required
          onChange={changeHandler}
          />

          <button type='submit'>Pay Now</button>
     </form>
    </div>
  )
}

export default Shipping
