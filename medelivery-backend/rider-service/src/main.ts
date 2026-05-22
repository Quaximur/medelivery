import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: ["amqp://rabbit:carrot@localhost:5673"],
                queue: "rider_queue",
                queueOptions: {
                    durable: process.env.NODE_ENV === "production",
                },
            },
        },
    );
    await app.listen();

    console.log("Rider service is listening on rider_queue...");
}

bootstrap();
