import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "engineer", "supervisor"],
      default: "user",
    },
    notifications: [
      {
        message: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: [
            "info",
            "warning",
            "repaintingCycleUpdate",
            "grindingCycleUpdate",
          ],
          default: "info",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    firstLogin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
  { strict: false }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
