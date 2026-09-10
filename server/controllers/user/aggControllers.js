import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { User } from "../../models/user.model.js";

export const getAlluser = async (req, res) => {
  try {
    console.log("User,");
    // const result = await Order.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "user",
    //       foreignField: "_id",
    //       as: "userDetails",
    //     },
    //   },
    //   {
    //     $unwind: "$userDetails",
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       totalAmount: 1,
    //       orderStatus: 1,
    //       createdAt: 1,

    //       userName: "$userDetails.name",
    //       userEmail: "$userDetails.email",
    //       userRole: "$userDetails.role",
    //     },
    //   },
    //   {
    //     $limit: 2,
    //   },
    //   {
    //     $count:"totalDetailss"
    //   }, {
    //     $addFields:{
    //         name:"BB"
    //     }
    //   }
    // ]);


    // const result = await Order.aggregate([
    //     {
    //         $set:{
    //             totalValue:{
    //                 $multiply:["$subtotal","$shippingCost"]
    //             }
    //         }
    //     }
    // ])

    const result = await Order.aggregate([
  {
    $lookup: {
      from: "users",
      let: {
        userId: "$user"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$userId"]
            }
          }
        },
        {
          $project: {
            name: 1,
            email: 1,
            role: 1
          }
        }
      ],
      as: "userDetails"
    }
  }
]);
    console.log(result, "result");
    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error, "err");
  }
};
