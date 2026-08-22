import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    google_id: {
      type: String,
    },
    loginType: {
      type: String,
      enum: ["normal_user", "google_user", "hybrid_user"],
      required: true,
    },
    photo: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
      },
    },
    userType: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
