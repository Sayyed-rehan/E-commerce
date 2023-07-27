import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema}from 'mongoose'

export type UserDocument = User & Document



@Schema({
    timestamps:true
})
export class User {

    @Prop()
    name:string

    @Prop({unique:[true, 'duplicate email enter']})
    email:string

    @Prop()
    contact:number

    @Prop()
    password:string

    @Prop()
    address:string

    @Prop()
    secondaryAddress:string

    @Prop()
    city:string

    @Prop()
    state:string

    @Prop()
    pincode:number

    @Prop()
    profileImg:string
}

export const UserSchema = SchemaFactory.createForClass(User)