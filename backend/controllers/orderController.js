import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";

// global variables
const currency = "inr";
const deliveryCharge = 49;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const storeAdminId = items[0]?.storeAdminId;
    const orderData = {
      userId,
      items,
      address,
      amount,
      storeAdminId,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order using STRIPE method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const storeAdminId = items[0]?.storeAdminId;

    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      storeAdminId,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//verifyStripe

const verifyStripe = async (req, res) => {
  const { userId, success, orderId } = req.body;
  // const storeAdminId = items[0]?.storeAdminId;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order using RAZORPAY method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const storeAdminId = items[0]?.storeAdminId;

    const orderData = {
      userId,
      items,
      address,
      amount,
      storeAdminId,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);
    // const paymentInfo = await razorpayInstance.payments.fetch(razorpay_payment_id);

    // console.log(paymentInfo);
    if (orderInfo.status === "paid") {
      // Mark order as paid in DB
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: "Payment verified" });
    } else {
      return res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ storeAdminId: req.adminId });
    res.json({ success: true, orders, message: "orders fetched successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders, message: "Order fetched successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update Order status for Admin Pane;
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findOne({
      _id: orderId,
      storeAdminId: req.adminId,
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or you are not authorized to update it",
      });
    }
    // const updatedStatus = await orderModel.findByIdAndUpdate(orderId, {
    //   status,
    // });
    // if (!updatedStatus) {
    //   res.json({ success: false, message: "status updated failed" });
    // }
    order.status = status;
    await order.save();
    res.json({ success: true, message: "status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
};
