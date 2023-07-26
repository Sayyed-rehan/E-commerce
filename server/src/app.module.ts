import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".local.env"]
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({uri:configService.get("MONGO_URL")}),
      inject:[ConfigService]
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    console.log("Server started at 5000...");
    
  }
}
