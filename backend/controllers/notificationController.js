import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const sendNotification = asyncHandler(async (req, res) => {
  const { userId, message, type = "info" } = req.body;

 
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Create a new notification
  const notification = {
    message,
    type,
    createdAt: new Date(),
  };

 
  user.notifications.push(notification);
  const updatedUser = await user.save();

  const newNotification = updatedUser.notifications[updatedUser.notifications.length - 1];

  
  res.status(201).json({
    message: "Notification sent successfully",
    user: {
      email: updatedUser.email,
      phone: updatedUser.phoneNumber,
    },
    notification: {
      _id: newNotification._id,
      message: newNotification.message,
      type: newNotification.type,
      createdAt: newNotification.createdAt,
    },
  });
});

