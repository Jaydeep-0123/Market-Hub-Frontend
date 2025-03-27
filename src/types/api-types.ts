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