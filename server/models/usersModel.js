import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
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
  // phoneNo:{
  //   type:String,
  //   required:[true, "Phone Number is required"]
  // },
  avatar: {
    type: Object,
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  myCourses: [],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  // this means anytime the password changes or is modified, hash the password
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
