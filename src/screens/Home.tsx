import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { useLatestProductsQuery } from '../redux/api/productAPI';
import { addToCart } from '../redux/reducer/cartReducer';
import { CartItem } from '../types/types';

function Home() {

  const {data,isLoading,isError} =useLatestProductsQuery("");

  const dispatch=useDispatch();

    const addToCartHandler=(cartItem:CartItem): string | undefined=>
    {
      if(cartItem.stock<1)
      {
        toast.error("Out of Stock");
        return undefined

      }
      dispatch(addToCart(cartItem))
      toast.success("Added to cart successfully");
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
