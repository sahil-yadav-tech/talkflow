import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rating: Number,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const amazonSchema = new mongoose.Schema({
  asin: String,
  amazonUrl: String,
  affiliateUrl: String,
  sellerName: String,
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },

    description: String,

    price: Number,

    discountPrice: Number,

    sku: {
      type: String,
      unique: true,
    },

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    tags: [String],

    categories: [
      {
        type: String,
      },
    ],

    amazonDetails: amazonSchema,

    inventory: {
      stock: Number,
      reservedStock: Number,
      lowStockThreshold: Number,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    reviews: [reviewSchema],

    averageRating: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);