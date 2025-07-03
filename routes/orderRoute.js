import express from 'express';
import {
  listOrders,
  updateStatus,
  userOrders,
  placeOrderCod,
  deleteOrder,
  getOrderHistory
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", userOrders);
orderRouter.post("/place", placeOrderCod);
orderRouter.post("/status", updateStatus);
orderRouter.delete("/delete/:id", deleteOrder);
orderRouter.get("/history", getOrderHistory); // 🔥 new route for order history

export default orderRouter;
