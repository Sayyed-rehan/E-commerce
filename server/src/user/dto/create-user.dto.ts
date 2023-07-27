import {Schema as MongooseSchema}from "mongoose"

export class CreateUserDto {

    name:string;
    email:string;
    contact:number;
    password:string;
    address:string;
    secondaryAddress:string;
    city:string;
    state:string;
    pincode:number;
    profileImg:string

}
