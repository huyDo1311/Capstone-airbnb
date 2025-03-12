import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { LocationsModule } from './modules/locations/locations.module';
import PrismaModule from './modules/prisma/prisma.module';
import { CheckTokenStrategy } from './modules/auth/token/token-strategy';
import { CheckPermissionStrategy } from './modules/auth/permission/permission-strategy';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    CommentsModule,
    BookingsModule,
    UsersModule,
    RoomsModule,
    LocationsModule
  ],
  controllers: [AppController],
  providers: [AppService, CheckTokenStrategy, CheckPermissionStrategy],
})
export class AppModule {}
