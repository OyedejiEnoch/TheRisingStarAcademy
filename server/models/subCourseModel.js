import mongoose from "mongoose";

const subCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Do enter the title of the course"],
    },
    description: {
      type: String,
      required: [true, "Do enter course description"],
    },
    summary: {
      type: String,
      required: [true, "Do enter course summary"],
    },
    body: {
      type: String,
    },
    topics: {
      type: [],
      title: String,
      body: String,
      summary: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    mainCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    video: {
      type: Object,
      url: String,
      public_id: String,
    },
    image: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SubCourse", subCourseSchema);
