import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ApiService } from './api/api.service';
import { AppModule } from './app.module';
import { PermissionService } from './permission/permission.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Uygulamayı başlatın ve NestExpressApplication tipinde bir app döndürün
  app.useStaticAssets(join(__dirname, '..', 'public')); 
  app.setBaseViewsDir(join(__dirname, '..', '../views')); // View dosyalarını kullanmak için kullanım
  app.setViewEngine('hbs'); // View engine olarak hbs kullanımı

  const permissionService = app.get(PermissionService); // PermissionService'yi enjekte edin
  await permissionService.assignAdminPermissions(); // assignAdminPermissions fonksiyonunu çağırın

  app.useGlobalPipes(new ValidationPipe()); // Global olarak ValidationPipe Kullanımı
  app.useWebSocketAdapter(new IoAdapter(app)); // Websocket adapter'ı kullanımı

  const config = new DocumentBuilder() // Swagger belgesi oluşturmak için DocumentBuilder kullanımı
    .setTitle('Users Example') //
    .setDescription('The users API description') 
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config); // Swagger belgesi oluşturun
  SwaggerModule.setup('swagger/api', app, document); // Swagger belgesini yapılandırın swagger adresini belirtin
  await app.listen(3000); // Uygulamayı 3000 portunda başlatın

  const syncApis = true; // syncApis değişkenini true yapın
  
  if (!syncApis){
    const apiService = app.get(ApiService); // ApiService'yi enjekte edin
    await apiService.syncApis(app); // syncApis fonksiyonunu çağırın
  }
}

bootstrap(); 

