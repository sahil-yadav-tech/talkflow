import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  productName: String,

  sku: String,

  image: String,

  quantity: Number,

  price: Number,

  totalPrice: Number,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    items: [orderItemSchema],

    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },

    paymentDetails: {
      paymentMethod: String,
      transactionId: String,
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
      },
    },

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    subtotal: Number,

    shippingCost: Number,

    tax: Number,

    totalAmount: Number,
    // createdAt: "",
    // updatedAt: "",
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model("Order", orderSchema);
