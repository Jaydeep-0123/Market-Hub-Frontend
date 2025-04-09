import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

function Search() {
  const {data:categoriesResponse,
        isLoading:loadingCategories,
        isError,
        error
      }=useCategoriesQuery("");

  const dispatch=useDispatch();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading:productLoading,data:searchData,isError:productIsError,error:prductError}=useSearchProductsQuery({search,sort,category,page,price:maxPrice})
  
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
  const isNextPage=page<4;
  const isPrevPage=page>1;

 if(isError)
 {
  const err=error as  CustomError;
  toast.error(err.data.message);
 }
if(productIsError)
{
  const err=prductError as CustomError;
  toast.error(err.data.message);
}
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>sort</h4>
          <select
            name=""
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option>None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || "No Limit"}</h4>
          <input
            type="range"
            min={100}
            max={1000000}
            value={maxPrice}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">All</option>
            {!loadingCategories&&categoriesResponse?.
            category.map((i,index)=>(
              <option key={index} value={i}>{i}</option>
            ))
            }
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input 
          type="text" 
          value={search} 
          placeholder="Search by name..."
          onChange={(e)=>{setSearch(e.target.value)}}/>
        <div className="search-product-list">
          {
            productLoading?<Loader/>:
            searchData?.data.map((i)=>(
              <ProductCard  
              productId={i._id}
              name={i.name}
              price={i.price} 
              stock={i.stock}  
              photo={i.photo}
              handler={addToCartHandler}/>
            ))
          }
        </div>
        {
         searchData&&searchData?.totalPages>1&&
          <article>
          <button disabled={!isPrevPage} onClick={()=>{setPage((pre)=>pre-1)}}>Prev</button>
          <span>
            {page} of {4}
          </span>
          <button disabled={!isNextPage} onClick={()=>{setPage((pre)=>pre+1)}}>Next</button>
        </article>
        }
      </main>
    </div>
  );
}

export default Search;
