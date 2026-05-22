import { Injectable } from "@nestjs/common";
import { db } from "./db/db";
import { dispatches } from "./db/schema";

const RIDERS = ["John", "Alice", "Bob", "Eve", "Charlie", "Dave"];

@Injectable()
export class AppService {
    async dispatchRider(data: {
        orderId: string;
        customerName: string;
        item: string;
    }) {
        const [dispatch] = await db
            .insert(dispatches)
            .values({
                orderId: data.orderId,
                customerName: data.customerName,
                item: data.item,
                riderStatus: "dispatched",
            })
            .returning();

        const rider = RIDERS[Math.floor(Math.random() * RIDERS.length)];

        console.log(
            `Dispatch created for order ID: ${data.orderId}, dispatch ID: ${dispatch.id}`,
        );

        console.log(
            `Rider ${rider} is on the way to deliver ${data.item} to ${data.customerName}`,
        );
    }
}
