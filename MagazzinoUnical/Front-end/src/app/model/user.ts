export interface User{
    username:string;
    password:string;
    name?:string;
    surname?:string;
    role?:string;
    email?:string;
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