import { Product } from './product';
import { User } from './user';

export interface Request{
    idRequest:number;
    title:string;
    description:string;
    status:string;
    type:string;
    date:string;
    requestedIte?:Product;
    requestingUser?:User;
}