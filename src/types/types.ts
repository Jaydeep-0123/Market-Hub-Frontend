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
  _id:string
}

export type OrderItem={
    name:string;
    photo:string;
    price:number;
    quantity:number;
    productId:string;
    _id:string;
}

export type MyOrder={
  orderItems:OrderItem[];
  shippingInfo:SippingInfo;
  userId:number;
  subtotal:number;
  tax:number;
  discount:number;
  shippingCharges:number;
  total:number;
  status:string;
  _id:string;

}

export type AllOrders={
  orderItems:OrderItem[];
  shippingInfo:SippingInfo;
  subtotal:number;
  tax:number;
  discount:number;
  shippingCharges:number;
  total:number;
  status:string;
  _id:string;
  userId:{
    name:string;
    _id:string;
  }
}

type Count={
    revanue: number;
    product: number;
    user: number;
    order: number;
}

type Percent={
    revanue: number;
    userPercent: number;
    productPercent: number;
    orderPercent: number;
}

type GenderRatio={
  male: number;
    female: number;
}

type LatestTransaction={
  _id:string;
  discount:number;
  amount:number;
  quantity:number;
  status:string;
}

export type Stats={
  categoryCount:Record<string, number>[];
      percent:Percent;
      count:Count;
      userGenderRatio:GenderRatio;
      chart:{
        order:number[];
        revanue:number[],
      },
      latestTransiction:LatestTransaction[]
};

type OrderFullfllMent={
  processing:number;
  shipped:number;
  delivered:number;
}

type StockAvailablity={
  inStock:number;
  outOfStock:number;
}

type RevenueDistribution={
  netMargin: number;
  discount: number;
  productionCost:number;
  brunt:number;
  marketingCost:number
}

type AdminCustomer={
  admin:number;
  customer:number;
}

type UserAgeGroup={
  teen:number;
  adult:number;
  old:number
}

export type Pie={
  orderFullfllMent: OrderFullfllMent;
  productCategories:Record<string, number>[]; 
  stockAvailablity: StockAvailablity;
  revenueDistribution:RevenueDistribution;
  adminCustomer: AdminCustomer;
   userAgeGroup:UserAgeGroup;
}

export type Bar={
  
    products:number[];
    orders:number[],
    users:number[]
  
}

export type Line={
  users:number[];
  products:number[];
  discount:[];
  revanue:[];
}