import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import { TokenCheck } from './modules/auth/token/token-check';
import {NestFactory, Reflector} from '@nestjs/core';
import { PermissionCheck } from './modules/auth/permission/permission-check';
import { ResponseSuccessInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.PORT);

  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new TokenCheck(reflector));
  app.useGlobalGuards(new PermissionCheck(reflector));
  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));

  const config = new DocumentBuilder()
    .setTitle('Airbnb')
    .setDescription('The airbnb API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
