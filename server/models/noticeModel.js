import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
});

export default mongoose.model("Notice", noticeSchema);
