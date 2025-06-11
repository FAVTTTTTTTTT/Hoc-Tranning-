import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
 imports: [
  ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration available globally
    envFilePath: '.env', // Path to your environment variables file
  }),

  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService:ConfigService) => ({
      uri: "mongodb+srv://admin:123@cluster0.ykx8qgg.mongodb.net/nestjs",
      retryAttempts: 10, // Number of retry attempts
      retryDelay: 3000, // Delay between retries in milliseconds
  }),
    inject: [ConfigService],
  }),
  UserModule,
 ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
