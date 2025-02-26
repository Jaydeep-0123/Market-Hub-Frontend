import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {lazy,Suspense} from 'react'
import Loader from './components/Loader.tsx';
import Header from './components/Header.tsx';
import OrderDetails from './screens/OrderDetails.tsx';
const Login = lazy(()=>import('./screens/Login.tsx'))
const Home = lazy(()=>import('./screens/Home.tsx'))
const Search = lazy(()=>import('./screens/Search.tsx'));
const Cart = lazy(()=>import("./screens/Cart.tsx"));
const Shipping = lazy(()=>import('./screens/Shipping.tsx'))
const Dashboard = lazy(() => import("./screens/admin/dashboard"));
const Products = lazy(() => import("./screens/admin/products"));
const Customers = lazy(() => import("./screens/admin/customers"));
const Transaction = lazy(() => import("./screens/admin/transaction"));
const Barcharts = lazy(() => import("./screens/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./screens/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./screens/admin/charts/linecharts"));
const Coupon = lazy(() => import("./screens/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./screens/admin/apps/stopwatch"));
const Toss = lazy(() => import("./screens/admin/apps/toss"));
const NewProduct = lazy(() => import("./screens/admin/management/newproduct"));
const Order=lazy(()=>import('./screens/Order.tsx'))
const ProductManagement = lazy(
  () => import("./screens/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./screens/admin/management/transactionmanagement")
);

function App() {
  
  return (
    <div>
     <Router>
      {/* Header */}
      <Header/>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>

        {/* Logged In User  */}
        <Route>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/order/:id' element={<OrderDetails/>}/>
        
        </Route>

        {/* Admin Routes */}
        <Route>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </Route>;
                </Routes>
                </Suspense>
              </Router>
    </div>
  )
}

export default App
