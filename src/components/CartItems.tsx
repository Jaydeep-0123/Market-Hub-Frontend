import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type  CartItemsProps={
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   cartItem: any;
};

function CartItems({cartItem}: CartItemsProps) {

    const {photo,name,productId,quantity,price}=cartItem;
  return (
    <div className='cart-item'>
        <img src={photo} width={400} height={400} alt='image'/>
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>{" "}
            <span>₹{price}</span>
        </article>
        <div>
            <button>-</button>
            <p>{quantity}</p>
            <button>+</button>
        </div>
        <button><FaTrash/></button>

    </div>
  )
}

export default CartItems
