import { Product } from './product';
import { User } from './user';

export interface Request{
    idEmployeeRequest:number;
    title:string;
    description:string;
    status:string;
    type:string;
    date:string;
    requestedItem?:Product;
    requestingUser?:User;
}