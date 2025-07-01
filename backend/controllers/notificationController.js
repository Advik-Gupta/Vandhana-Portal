import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const sendNotification = asyncHandler(async (req, res) => {
  const { message, type = "info" } = req.body;
  let { userId } = req.body;
  const to = (req.query.to || "").trim().split(/\s+/).filter(Boolean);

  if (to.includes("admin")) {
    const admins = await User.find({ role: "admin" }).select("_id");
    const adminIds = admins.map((user) => user._id);

    if (adminIds.length === 0) {
      res.status(404);
      throw new Error("No admins found");
    }

    adminIds.forEach(async (adminId) => {
      const notification = {
        message,
        type,
      };

      const updatedUser = await User.findByIdAndUpdate(
        adminId,
        { $push: { notifications: notification } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        res.status(404);
        throw new Error("User not found");
      }
    });

    return res.status(201).json({
      message: "Notification sent to all admins successfully",
    });
  }

  if (to.includes("supervisor")) {
    const supervisors = await User.find({ role: "supervisor" }).select("_id");
    const supervisorIds = supervisors.map((user) => user._id);

    if (supervisorIds.length === 0) {
      res.status(404);
      throw new Error("No supervisors found");
    }

    supervisorIds.forEach(async (supervisorId) => {
      const notification = {
        message,
        type,
      };

      const updatedUser = await User.findByIdAndUpdate(
        supervisorId,
        { $push: { notifications: notification } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        res.status(404);
        throw new Error("User not found");
      }
    });

    return res.status(201).json({
      message: "Notification sent to all supervisors successfully",
    });
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

  return res.status(201).json({
    message: "Notification sent successfully",
  });
});
