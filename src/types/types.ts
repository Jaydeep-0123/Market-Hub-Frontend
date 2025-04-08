export interface User {
  name:string;
  email:string;
  photo:string;
  gender:string;
  role:string;
  dob:string;
  _id:string
}

export type Product =
{
   name:string;
   photo:string;
   price:number;
   stock:number;
   category:string;
   _id:string
}

export type SippingInfo={
  address:string;
  city:string;
  state:string;
  country:string;
  pincode:string
}

export type CartItem={
  name:string;
  photo:string;
  price:number;
  productId:string;
  quantity:number;
  stock:number;
}