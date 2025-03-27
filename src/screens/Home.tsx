import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useLatestProductsQuery } from '../redux/api/productAPI'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function Home() {

  const {data,isLoading,isError} =useLatestProductsQuery("");

  const addToCartHandler=()=>{

  }

  if(isError)
    toast.error("Cannot Fetch the Product")

  return (
    <div className='home'>
     <section></section>
     <h1>Latest Product
      <Link to={"/search"} className='findMore'>More</Link>
     </h1>
     <main>
    {
     isLoading?(
     <Loader/>
     ) :(data?.data.map((i)=>(
        <ProductCard 
        productId={i._id}
        name={i.name} 
        price={i.price} 
        stock={i.stock}  
        photo={i.photo}
        handler={addToCartHandler}/>
      )))
    }
     </main>
    </div>
  )
}

export default Home
