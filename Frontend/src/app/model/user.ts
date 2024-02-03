export interface User{
    email:string;
    password:string;
    name?:string;
    surname?:string;
    role?:string;
    phone?:string;
    address?:string;
    city?:string;
    cap?:string;
    province?:string;
    country?:string;
    birthDate?:Date;
    registrationDate?:Date;
    lastAccessDate?:Date;
    enabled?:boolean;
}

export interface AuthToken{
    token:string;
}