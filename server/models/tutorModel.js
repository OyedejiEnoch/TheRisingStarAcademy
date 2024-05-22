import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const tutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Do enter your first name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Do enter a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phoneNo: {
    type: String,
  },
  bio: {
    type: String,
  },
  profession: {
    type: String,
  },
  course: {
    type: String,
  },
  avatar: {
    type: Object,
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "tutor",
  },
});

tutorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  next();
});

tutorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model("Tutor", tutorSchema);
