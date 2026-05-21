import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "RIDER_SERVICE",
                transport: Transport.RMQ,
                options: {
                    urls: ["amqp://rabbit:carrot@localhost:5673"],
                    queue: "rider_queue",
                    queueOptions: {
                        durable: process.env.NODE_ENV === "production",
                    },
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
