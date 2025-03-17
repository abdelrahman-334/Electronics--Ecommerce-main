/* eslint-disable prettier/prettier */
export class CreateOrderDto {
  items: {
    productId: string;
    quantity: number;
  }[]; // Array of items
  userId: string; // User placing the order
}
