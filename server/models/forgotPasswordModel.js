import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const forgotPasswordSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: [true, "Please input your OTP"],
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

forgotPasswordSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcryptjs.hash(this.token, 10);
  }

  next();
});

forgotPasswordSchema.methods.compareToken = async function (token) {
  const result = await bcryptjs.compare(token, this.token);
  return result;
};

export default mongoose.model("ForgotPassword", forgotPasswordSchema);
