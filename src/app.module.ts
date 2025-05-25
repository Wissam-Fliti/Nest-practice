import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRootAsync({useFactory: () => ({
    uri: process.env.DB_URL,
  })}), ItemsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
