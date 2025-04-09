import React from "react";
import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
// import camera from '../assets/images/camera2.webp'
type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: ((cartItem: CartItem) => string | undefined);
};

// const server = "dasdnasjhdj";

function ProductCard({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductsProps) {
  return (
    <div className="product-card">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} width={200} height={200} alt={name} />
      <p >{name}</p>
      <span>₹ {price}</span>
      <div>
        <button
          onClick={() => {
            handler({productId,price,name,photo,stock,quantity:1});
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
