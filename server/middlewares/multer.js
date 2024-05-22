import multer from "multer";

const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({});

const imageFileFilter = (req, file, cb) => {
  //   console.log(file);
  if (!file.mimetype.startsWith("image")) {
    cb("Support only image files", false);
  }
  cb(null, true);
};

export const uploadImage = multer({ storage, fileFilter: imageFileFilter });
