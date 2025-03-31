import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {

  const {user}=useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)
  const navigate=useNavigate();
  
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [photo, setPhoto] = useState<File>();
  
  const [newProduct]=useNewProductMutation();
  
  
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

 const onSubmitHandler=async(e:FormEvent<HTMLFormElement>)=>
 {
    e.preventDefault();
    if(!name || !price || !category || !photo || !stock)
    {
      toast.error("All Field is required");
    }
    const formData=new FormData();
    formData.set("name",name);
    formData.set("price",price.toString());
    formData.set("stock",stock.toString());
    formData.set("photo",photo!);
    formData.set("category",category);

    const res = await newProduct({ id: user?._id ?? "" , formData });
    if(res.data?.data)
    {
      toast.success(res.data.message)
      navigate("/admin/product")
    }
    else
    {
      toast.error("something went wrong")
    }

 }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={onSubmitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} required/>
            
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
