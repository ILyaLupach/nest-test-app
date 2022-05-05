import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.SERVER_PORT || 3000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('REST API Documentation')
    .setVersion('1.0.0')
    // .setDescription('REST API Documentation')
    // .addTag('electronic')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(PORT, () => console.log(`started on port: ${PORT}`))
}
bootstrap()
