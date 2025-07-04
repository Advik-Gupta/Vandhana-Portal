import transporter from "./mailer.js";
import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const sendNotification = asyncHandler(async (req, res) => {
  const { message, type = "info" } = req.body;
  let { userId } = req.body;
  const to = (req.query.to || "").trim().split(/\s+/).filter(Boolean);

  const notification = {
    message,
    type,
  };

  if (to.includes("admin")) {
    const admins = await User.find({ role: "admin" }).select("_id");
    const adminIds = admins.map((user) => user._id);

    if (adminIds.length === 0) {
      res.status(404);
      throw new Error("No admins found");
    }

    adminIds.forEach(async (adminId) => {
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
  }

  if (to.includes("supervisor")) {
    const supervisors = await User.find({ role: "supervisor" }).select("_id");
    const supervisorIds = supervisors.map((user) => user._id);

    if (supervisorIds.length === 0) {
      res.status(404);
      throw new Error("No supervisors found");
    }

    supervisorIds.forEach(async (supervisorId) => {
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
  }

  if (userId) {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { notifications: notification } },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }
  }

  return res.status(201).json({
    message: "Notification sent successfully",
  });
});

export const sendMailNotification = asyncHandler(async (req, res) => {
  const { message, userIds } = req.body;
  console.log("Sending mail notification:", message, userIds);

  userIds.forEach(async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return;
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Site data rejected",
        text: `Your data for the site has been rejected.
          ${message}
        `,
      });
    } catch (error) {
      console.error(`Error sending email to ${user.email}:`, error);
    }
  });

  return res.status(201).json({
    message: "Mail notification sent successfully",
  });
});
