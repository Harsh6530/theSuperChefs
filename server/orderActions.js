import orderSchema from "../models/orderSchema.js";
import connectDb from "../middleware/connectDb.js";

export const createOrder = async (data) => {
  try {
    const { chefConn } = await connectDb();
    const Order = chefConn.model("Order", orderSchema);
    const newOrder = new Order(data);

    await newOrder.save();

    return {
      success: true,
      status: 201,
      message: "Order created successfully",
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      status: 500,
      message: "Error creating order",
    };
  }
};

export const getOrdersbyId = async (data) => {
  try {
    console.log(data);
    const { name, mobile } = data;
    const { chefConn } = await connectDb();
    const Order = chefConn.model("orders", orderSchema);
    const orders = await Order.find({ user: name, mobile });

    return {
      success: true,
      status: 200,
      data: orders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      success: false,
      status: 500,
      message: "Error fetching orders",
    };
  }
};
