import { User } from "./user";

export interface Product{
    idItem?:number;
    name:string;
    type:string;
    description?:string;
    location?:string;
    image:string;
    assignedUser: User | string;
    emailUser?: string;
}