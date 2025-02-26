import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function Home() {

  const addToCartHandler=()=>{

  }
  return (
    <div className='home'>
     <section></section>
     <h1>Latest Product
      <Link to={"/search"} className='findMore'>More</Link>
     </h1>
     <main>
      <ProductCard 
       productId='asdasd'
       name='Camera' 
       price={4545} 
       stock={453}  
       photo='https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg'
       handler={addToCartHandler}/>
     </main>
    </div>
  )
}

export default Home
