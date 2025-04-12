import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import { toast } from 'react-toastify';
import TableHOC from '../components/admin/TableHOC';
import {useMyOrdersQuery } from '../redux/api/orderAPI';
import { CustomError } from '../types/api-types';
import { UserReducerInitialState } from '../types/reducer-types';
import Loader from '../components/Loader';
type DataType={
    _id:string;
    amount:number;
    quantity:number;
    discount:number;
    status:ReactElement;
    action:ReactElement;
};

const column:Column<DataType>[]=[{
    Header: "ID",
    accessor: "_id",
},{
    Header: "Amount",
    accessor: "amount",
},
{
    Header: "Quantity",
    accessor: "quantity",
},{
    Header: "Discount",
    accessor: "discount",
},{
    Header: "Status",
    accessor: "status",
},{
    Header: "Action",
    accessor: "action",
}
]

function Order() {
 

    const {user}=useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)
    
    
      const {isLoading,data,isError,error}=useMyOrdersQuery(user?._id??"");

    const [rows,setRows]=useState<DataType[]>([]);

//    const [rows, setRows] = useState<DataType[]>([]);
   
     if(isError)
       {
         const err=error as CustomError;
         toast.error(err.data.message);
       }
     
       useEffect(()=>{
           if (data) {
             setRows(
               data.data.map((i) => ({
                _id:i._id,
                amount:i.total,
                discount:i.discount,
                quantity:i.orderItems.length,
                status:<span className={i.status==="Processing"?"red":i.status==="Shipped"?"green":"purple"}>{i.status}</span>,
                action:<Link to={`/admin/transaction/${i._id}`}>View</Link>
               }))
             );
           }
         },[data])

    const table= TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",rows.length>6)();
    
  return (
    <div className='container'>
      <h1>My Orders</h1>
      {isLoading?<Loader/>:table}
    </div>
  )
}

export default Order
