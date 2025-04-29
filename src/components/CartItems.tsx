import React, {} from 'react'
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartItem } from '../types/types';

type  CartItemsProps={
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   cartItem: CartItem;
   incrementHandler:(cartItem:CartItem)=>void;
   decrementHandler:(cartItem:CartItem)=>void;
   removeHandler:(id:string)=>void;
};

function CartItems({
          cartItem,
          incrementHandler,
          decrementHandler,
          removeHandler
        }: CartItemsProps) {

  const {photo,name,productId,quantity,price}=cartItem;
 return (
    <div className='cart-item'>
        <img src={`${import.meta.env.VITE_SERVER}/${photo}`} width={400} height={400} alt='image'/>
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>{" "}
            <span>₹{price}</span>
        </article>
        <div>
            <button disabled={quantity<2} onClick={()=>decrementHandler(cartItem)}>-</button>
            <p>{quantity}</p>
            <button onClick={()=>{incrementHandler(cartItem)}}>+</button>
        </div>
        <button onClick={()=>{removeHandler(productId)}}><FaTrash/></button>

    </div>
  )
}

export default CartItems
