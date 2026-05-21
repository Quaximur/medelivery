import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { OrderDto } from "./@types";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @EventPattern("order_created")
    async handleOrderCreated(
        @Payload()
        data: OrderDto,
    ) {
        console.log(
            `Kitchen received order_created event, order ID: ${data.orderId}`,
        );

        return this.appService.processOrder(data);
    }
}
