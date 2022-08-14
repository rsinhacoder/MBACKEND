import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { DataSource } from "typeorm";
export declare const AppDataSource: DataSource;
export declare class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
