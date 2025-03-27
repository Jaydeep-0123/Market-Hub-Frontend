import React from "react";
import { FaPlus } from "react-icons/fa";
// import camera from '../assets/images/camera2.webp'
type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

// const server = "dasdnasjhdj";

function ProductCard({
  // productId,
  photo,
  name,
  price,
  // stock,
  handler,
}: ProductsProps) {
  return (
    <div className="product-card">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} width={400} height={400} alt={name} />
      <p >{name}</p>
      <span>₹ {price}</span>
      <div>
        <button
          onClick={() => {
            handler();
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
