import { NestFactory } from "@nestjs/core";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";
var cors = require("cors");


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle("Moleculus API")
    .setDescription("")
    .setVersion("1.0")
    .addTag("Moleculus")
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);

  console.log(`Server running on http://localhost:3000`);
}
bootstrap();
