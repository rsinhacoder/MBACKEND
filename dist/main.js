"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
var cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api/v1");
    app.use(cors());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Moleculus API")
        .setDescription("")
        .setVersion("1.0")
        .addTag("Moleculus")
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(3000);
    console.log(`Server running on http://localhost:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map