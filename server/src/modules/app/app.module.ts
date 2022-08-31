import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'src/common/config/configuration';
import { MongooseConfigService } from 'src/common/config/MongooseConfigService';
import { AuthModule } from '../auth/auth.module';
import { CostsModule } from '../costs/costs.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // first variant connect to mongoDB
    /* ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.SERVER_DB_URL_ROOT), */

    //second variant connect to mongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    CostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
