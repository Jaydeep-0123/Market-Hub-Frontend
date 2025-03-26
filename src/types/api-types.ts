import { User } from "./types";

export type  MessageResponse=
{
    status:string;
    statusCodes:number;
    message:string;
    data:object;
    error:string;
}

export type UserResponse={
    status:string,
    statusCode:number
    data:User,
    error:string
}