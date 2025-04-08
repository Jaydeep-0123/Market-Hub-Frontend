import { Product, User } from "./types";

export type CustomError={
    status:number;
    data:{
        message:string;
        success:boolean;
    }
}


export type  MessageResponse=
{
    status:string;
    statusCodes:number;
    message:string;
    data:object;
    error:string;
}

export type UserResponse={
    status:string;
    statusCode:number;
    data:User;
    error:string;
}

export type ProductResponse={
    status:string;
    statusCode:number;
    data:Product[];
    error:string;
}

export type  CategoryResponse={
    status:string;
    statusCode:number;
    category:string[];
    error:string;
}

export type SearchProductResponse ={
    status:string;
    statusCode:number;
    totalPages:number;
    data:Product[];
    error:string;

}

export type SearchProductRequest = {
  price:number;
  page:number;
  category:string;
  sort:string;
  search:string
}

export type NewProductRequest={
    id:string;
    formData:FormData;

}

export type ProductDetails={
    status:string;
    statusCode:number;
    data:Product;
    error:string
}

export type UpdateProductRequest={
    formData:FormData;
    userId:string;
    productId:string;
}

export type ProductUpdateResponse={
    status:string;
    statusCode:number;
    msg:string;
    error:string;
}

export type DeleteProductResponse={
    status:string;
    statusCode:number;
    message:string;
    error:string;
}

export type DeleteProductRequest={
   userId:string;
   productId:string
}