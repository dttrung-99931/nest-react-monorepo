import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExceptionFilter } from '@panda-chat/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NestExceptionFilter());
  // ValidationPipe is replaced by ZodValidationPipe & ZodSerializerInterceptor
  // Check in app.module.ts
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // Remove unknown fields
  //     forbidNonWhitelisted: true, //
  //     transform: true, // Auto convert type: '1' => 1
  //   }),
  // );
  setupSwagger(app);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My just dx swagger nestjs')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument, {
    swaggerOptions: {
      // Keep inputted token after swagger page
      persistAuthorization: true,
    },
    customJsStr: `
      (function() {
        const originalFetch = window.fetch;
        window.fetch = async function (...args) {
          const response = await originalFetch.apply(this, args);
          const url = typeof args[0] === 'string'
            ? args[0] : args[0]?.url ?? '';
          if (url.includes('auth/login') && response.ok){
            console.log('Handling authorize after login successfully!');
            const body = await response.clone().json();
            const token = body?.data?.token;
            if (token && window.ui){
              window.ui.authActions.authorize({
                bearer: {
                  name: 'bearer',
                  schema: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                  value: token
                }
              });
            }
          }
          return response;
        }    
      })();
    `,
  });
}
