import express from "express";
import { User } from "../../models/user.model.js";
import { Product } from "../../models/product.model.js";
const router = express.Router();

// Find all users.
router.get("/allUser", async (req, res) => {
  try {
    // const result = await User.find({
    //     // _id:"6a391a9c4222d16bbf4d6099"
    //     email:{
    //         $regx:"PRiya@gmail.com",
    //         $options:"i"
    //     }
    // })

    //  const result = await User.find({
    //   email: {
    //     $regex: "PRiya@gmail.com",
    //     $options: "i", // 'i' for case-insensitive
    //   },
    // });

    //TODO Find BY id and update
    // const result = await User.findByIdAndUpdate(
    //   "6a391a9c4222d16bbf4d609d",
    //   {
    //     isActive: true,
    //   },
    //   {
    //     new: false,
    //     runValidators: true,
    //   },
    // );

    // TODO Find BY id and DELETE

    // Find all products.
    // Find product by id.
    // Find product by SKU.
    // Find active products.
    // Find inactive products.
    // Insert new product.
    // Update product price.
    // Update stock.
    // Delete product.
    // Restore deleted product.
    // const result = await User.findByIdAndDelete("6a391a9c4222d16bbf4d609d")

    //TODO const result = await Product.find();
    // const result = await Product.findById("6a391b343b2d3a807809c62e");
    // const result = await Product.findOne({
    //     "inventory.stock" : 106
    // });

    // Find products with price greater than 1000.
    // const result = await Product.find({
    //   price:{
    //     $gt:2000
    //   }
    // }).limit(1);
    // Find products with price less than 500.
    //   const result = await Product.find({
    //   price:{
    //     $lt:1001
    //   }
    // }).limit(1);
    // // Find products between 500 and 1000.
    // const result = await Product.find({
    //   price: {
    //     $lt: 2000,
    //     $gt: 999,
    //   },
    // });
    // Find products price >=1000.
    //     const result = await Product.find({
    //   price: {
    //     $gte:2000
    //   }
    // });

    // Find products price <=500.
    //         const result = await Product.find({
    //   price: {
    //     $lte:2000
    //   }
    // });
    //? Find products not equal to 1000.
    // const result = await Product.find({
    //   price: {
    //     $ne: 1000,
    //   },
    // }).sort({
    //   price: 1,
    // });
    // Find products where discountPrice exists.
    const result = await Product.find({
      discountPrice:{
        exists:true
      }
    })

    // Find products where discountPrice doesn't exist.

    return res.status(200).json({
      message: "All suer details",
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.log(error, "error in Main Api ");
  }
});

export default router;
