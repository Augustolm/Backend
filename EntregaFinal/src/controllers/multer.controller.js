import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    if (file.fieldname === "profileImage") {
      folder = "profiles";
    } else if (file.fieldname === "productImage") {
      folder = "products";
    } else {
      folder = "documents";
    }
    cb(null, `uploads/${folder}`);
  },
  filename: (req, file, cb) => {
    const { uid } = req.params;
    cb(null, uid + "-" + Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
