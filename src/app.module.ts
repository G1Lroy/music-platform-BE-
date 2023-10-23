import { Module } from '@nestjs/common';
import { TrackModule } from './business/track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();

const pass = process.env.MONGO_PASS;

@Module({
  imports: [
    UserModule,
    TrackModule,
    ServeStaticModule.forRoot({ rootPath: resolve(__dirname, 'static') }),
    MongooseModule.forRoot(
      `mongodb+srv://admin:${pass}@cluster0.frapq5s.mongodb.net/?retryWrites=true&w=majority`,
    ),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
