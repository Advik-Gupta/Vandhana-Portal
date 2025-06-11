import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const sendNotification = asyncHandler(async (req, res) => {
  const { message, type = "info" } = req.body;
  let { userId } = req.body;

  if (!userId) {
    userId = "68471db39c241a87a48e338f";
  }

  // Create a new notification
  const notification = {
    message,
    type,
  };

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { notifications: notification } },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(201).json({
    message: "Notification sent successfully",
  });
});
