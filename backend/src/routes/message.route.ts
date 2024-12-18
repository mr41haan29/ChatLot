import express from "express";
import authenticateRoute from "../middleware/authenticateRoute.js";
import {
  sendMessage,
  getMessages,
  getUsersForSidebar,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", authenticateRoute, getUsersForSidebar);
router.get("/:id", authenticateRoute, getMessages);
router.post("/send/:id", authenticateRoute, sendMessage);

export default router;
