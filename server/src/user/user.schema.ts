import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema}from 'mongoose'

export type UserDocument = User & Document

export class User {
    
}