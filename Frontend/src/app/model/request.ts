import { Product } from './product';
import { User } from './user';

export interface Request{
    idRequest:number;
    idUser:number;
    idProduct:number;
    title:string;
    quantity:number;
    status:string;
    type:string;
    date:Date;
    product?:Product;
    user?:User;
}