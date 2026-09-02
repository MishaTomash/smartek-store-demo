import mongoose, { Schema, type Document, type Types } from "mongoose";

export type OrderStatus = "new" | "confirmed" | "shipped" | "completed" | "cancelled";

interface ICustomer {
  name: string;
  phone: string;
  city: string;
  postOffice: string;
}

interface IProductSnapshot {
  model: string;
  price: number;
}

export interface IOrder extends Document {
  product: Types.ObjectId;
  productSnapshot: IProductSnapshot;
  customer: ICustomer;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productSnapshot: {
      model: { type: String, required: true },
      price: { type: Number, required: true },
    },
    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postOffice: { type: String, required: true, trim: true },
    },
    status: {
      type: String,
      enum: ["new", "confirmed", "shipped", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);