import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices/client/client-proxy";
import { OrderDto } from "./@types";
import { db } from "./db/db";
import { tickets } from "./db/schema";

@Injectable()
export class AppService {
    constructor(
        @Inject("RIDER_SERVICE") private readonly riderClient: ClientProxy,
    ) {}

    async processOrder(data: OrderDto) {
        const [ticket] = await db
            .insert(tickets)
            .values({
                orderId: data.orderId,
                customerName: data.customerName,
                item: data.item,
                status: "received",
            })
            .returning();

        console.log(`Kitchen has created the ticket, ticket ID: ${ticket.id}`);

        await new Promise((res) => setTimeout(res, 1000));

        this.riderClient.emit("order_ready", {
            orderId: data.orderId,
            customerName: data.customerName,
            item: data.item,
        });

        console.log(
            `Kitchen has emitted order_ready event for order ID: ${data.orderId}`,
        );
    }
}
