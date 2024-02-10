export interface User{
    idUser?:number;
    email:string;
    password:string;
    name?:string;
    surname?:string;
    role?:string;
    banned?:boolean;

    phone?:string;
    address?:string;
    city?:string;
    cap?:string;
    province?:string;
    country?:string;
    birthDate?:Date;
    registrationDate?:Date;
    lastAccessDate?:Date;
}

export interface AuthToken{
    accessToken:string;
}