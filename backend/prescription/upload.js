import multer from "multer";
import path from "path";
import crypto from "crypto";

// ✅ Storage configuration: saves files to uploads/prescriptions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads", "prescriptions"));
  },
  filename: (req, file, cb) => {
    const userId = req.body.userId || "anonymous";
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const hash = crypto.randomBytes(4).toString("hex");
    const safeName = `${timestamp}_${userId}_${hash}${ext}`;
    cb(null, safeName);
  },
});

// ✅ File filter: allow only images and PDFs
const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
  "image/heic", // Optional: support mobile uploads
  "image/heif"
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.warn(`❌ Rejected file type: ${file.mimetype} from userId: ${req.body?.userId || "unknown"}`);
    cb(new Error("Only JPEG, PNG, HEIC, and PDF files are allowed"));
  }
};

// ✅ Multer initialization
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

export default upload;
