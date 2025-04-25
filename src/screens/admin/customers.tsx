/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import Loader from "../../components/Loader";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/userAPI";
import { RootState } from "../../redux/store";
import moment from "moment";
import { CustomError } from "../../types/api-types";

interface DataType {
  name: string;
  email: string;
  gender: string;
  role: string;
  dob:string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Dob",
    accessor: "dob",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Customers = () => {
  
  const {user}=useSelector((state:RootState)=>state.userReducer)
  const {isLoading,data,isError,error}=useAllUsersQuery(user?._id??"");

  const [deleteUser]=useDeleteUserMutation();
  
  const [rows, setRows] = useState<DataType[]>([]);

  const deleteHandler=async(userId:string)=>{
     const res=await deleteUser({userId,adminUserId:user?._id??""})
     if(res.data?.statusCode===200)
     {
       toast.success("customer deleted successfully")
     }
     else
     {
       toast.error("something went wrong")
     }
  }

    if(isError)
    {
      const err=error as CustomError;
      toast.error(err.data.message);
    }
  
    useEffect(()=>{
      if (data) {
        setRows(
          data.data.map((i)=>({
            // avatar:<img src={i.photo} alt="img"/>,
            name:i.name,
            email:i.email,
            gender:i.gender,
            dob:moment(i.dob).format("DD MMMM YYYY"),
            role:i.role,
            action:<button onClick={()=>{deleteHandler(i._id)}} title="Delete"><FaTrash/></button>
          }))
        );
      }
    },[data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading?<Loader/>:Table}</main>
    </div>
  );
};

export default Customers;
