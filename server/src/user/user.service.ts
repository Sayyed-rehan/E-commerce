import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import {Model} from "mongoose"
import { InjectModel } from '@nestjs/mongoose';
import { UserModule } from './user.module';
const md5 = require('md5')

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){

  }

  create(createUserDto: CreateUserDto) :Promise<User> {

    const hashPassword = md5(createUserDto.password)

    const model = new this.userModel();
    model.name = createUserDto.name;
    model.email = createUserDto.email;
    model.contact = createUserDto.contact;
    model.password = hashPassword
    model.address = createUserDto.address;
    model.secondaryAddress = createUserDto.secondaryAddress;
    model.city = createUserDto.city;
    model.state = createUserDto.state;
    model.pincode = createUserDto.pincode;
    model.profileImg = createUserDto.profileImg;
    return model.save();
  }

  //login
  async login(email:string, password:string){

    const authEmail = await this.userModel.findOne({email:email}).exec()
    
    if(!authEmail){
      throw new UnauthorizedException("inavlid Email")
    }
    
    const hashPassword = md5(password)
    const authPass = await this.userModel.findOne({password:hashPassword}).exec()
    if(!authPass){
      throw new UnauthorizedException("password inavlid")
    }

    return "login"
    
    
  }  

  findAll() :Promise<User[]>{
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }




  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({_id:id},
      {
        address:updateUserDto.address,
        secondaryAddress:updateUserDto.secondaryAddress,
        city:updateUserDto.city,
        state:updateUserDto.state,
        pincode:updateUserDto.pincode,
        profileImg:updateUserDto.profileImg
      }).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id:id}).exec();
  }
}
