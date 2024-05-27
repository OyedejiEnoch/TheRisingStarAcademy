import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Do enter the title of the course"],
    },
    about: {
      type: String,
      required: [true, "Do enter course description"],
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
    benefits: {
      type: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    subCourses: {
      type: [],
    },
    video: {
      type: Object,
      url: String,
      public_id: String,
    },
    image: {
      type: Object,
      public_id: {
        type: String,
        required: [true, "An image is required "],
      },
      url: {
        type: String,
        required: true,
      },
    },
    enrolledUsers: {
      type: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
