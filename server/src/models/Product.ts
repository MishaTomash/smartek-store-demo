import mongoose, { Schema, type Document } from "mongoose";

export type Generation =
  | "SE"
  | "6"
  | "6S"
  | "7"
  | "8"
  | "X"
  | "XR"
  | "XS"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16";

export type Condition = "excellent" | "good" | "fair";
export type Availability = "in_stock" | "out_of_stock";

export const GENERATIONS: Generation[] = [
  "SE",
  "6",
  "6S",
  "7",
  "8",
  "X",
  "XR",
  "XS",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
];

export interface IProduct extends Omit<Document, 'model'> {
  model: string;
  generation: Generation;
  storage: number;
  color: string;
  images: string[];
  warranty: string;
  availability: Availability;
  condition: Condition;
  batteryHealth: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    model: {
      type: String,
      required: [true, "Назва моделі обов'язкова"],
      trim: true,
    },
    generation: {
      type: String,
      required: true,
      enum: GENERATIONS,
    },
    storage: {
      type: Number,
      required: true,
      min: 16,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    warranty: {
      type: String,
      default: "14 днів",
    },
    availability: {
      type: String,
      required: true,
      enum: ["in_stock", "out_of_stock"],
      default: "in_stock",
    },
    condition: {
      type: String,
      required: true,
      enum: ["excellent", "good", "fair"],
    },
    batteryHealth: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);