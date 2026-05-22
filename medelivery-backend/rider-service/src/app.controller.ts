import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @EventPattern("order_ready")
    async handleOrderReady(@Payload() data: {
        orderId: string;
        customerName: string;
        item: string;
    }) {
        console.log(
            `Rider received order_ready event, order ID: ${data.orderId}`,
        );

        return this.appService.dispatchRider(data);
    }
}
