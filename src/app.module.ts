import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ServeStaticModule.forRoot({ rootPath: resolve(__dirname, 'static') }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.frapq5s.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
