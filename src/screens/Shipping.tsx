import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartReducerInitialState } from '../types/reducer-types';
import { saveShippingInfo } from '../redux/reducer/cartReducer';

function Shipping() {

    const {cartItems,total}=useSelector((state:{cartReducer:CartReducerInitialState})=>state.cartReducer);
  
  const navigate=useNavigate();
  const disPatch=useDispatch();
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

  async function submitHandler(e:FormEvent<HTMLFormElement>)
  {
    disPatch(saveShippingInfo(shippingInfo));
    e.preventDefault();
    try 
    {
        const response=await axios.post(`http://localhost:8000/api/v1/payment/createPayment`,{
          amount:total,
        },{
          headers:{
            "Content-Type":"application/json"
          }
        }
        
      )
      if(response.data.statusCode===200)
      {
    
        navigate("/pay",{
          state:response.data.data
        })
      }
        
    } 
    catch (error) 
    {
      console.log(error);
      toast.error("Something Went Wrong")
      
    }
  }

    useEffect(()=>{
      if(cartItems.length===0)
      {
        navigate('/cart')
      }
    },[cartItems])
  return (
    <div className='shipping'>
     <button className='back-btn' onClick={()=>{navigate("/cart")}}><BiArrowBack/></button>
     <form onSubmit={submitHandler}>

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
