import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fs from "fs/promises"; // use promises API
import sharp from "sharp";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directory exists
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../uploads/others'); // Default path

    if (req.originalUrl.includes('/tours')) {
      uploadPath = path.join(__dirname, '../uploads/tours');
    } else if (req.originalUrl.includes('/blogs')) {
      uploadPath = path.join(__dirname, '../uploads/blogs');
    } else if (req.originalUrl.includes('/gallery')) {
      uploadPath = path.join(__dirname, '../uploads/gallery');
    } else if (req.originalUrl.includes('/rent')) {
      uploadPath = path.join(__dirname, '../uploads/rent');
    } else if (req.originalUrl.includes('/testimonials')) {
      uploadPath = path.join(__dirname, '../uploads/testimonials');
    }else if (req.originalUrl.includes('/destinations')) {
      uploadPath = path.join(__dirname, '../uploads/destinations');
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
  isValid ? cb(null, true) : cb(new Error('Only image files (JPEG, JPG, PNG, GIF) are allowed!'), false);
};

// Export as default
const upload = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB limit

// Convert uploaded images to AVIF
export const convertToAvif = async (req, res, next) => {
  try {
    // Single file
    if (req.file) {
      const filePath = req.file.path;
      const avifPath = filePath.replace(path.extname(filePath), ".avif");

      await sharp(filePath).toFormat("avif", { quality: 50 }).toFile(avifPath);

      try { await fs.unlink(filePath); } catch (err) {
        console.warn("Could not delete original file:", err.message);
      }

      req.file.filename = path.basename(avifPath);
      req.file.path = avifPath;
      req.body.image = `/uploads/${path.basename(path.dirname(avifPath))}/${req.file.filename}`;
    }

    // Multiple files
    if (req.files) {
      for (const field in req.files) {
        req.files[field] = await Promise.all(
          req.files[field].map(async (file) => {
            const filePath = file.path;
            const avifPath = filePath.replace(path.extname(filePath), ".avif");

            await sharp(filePath).toFormat("avif", { quality: 50 }).toFile(avifPath);

            try { await fs.unlink(filePath); } catch (err) {
              console.warn("Could not delete original file:", err.message);
            }

            return {
              ...file,
              filename: path.basename(avifPath),
              path: avifPath,
              url: `/uploads/${path.basename(path.dirname(avifPath))}/${path.basename(avifPath)}`,
            };
          })
        );
      }
    }

    next();
  } catch (error) {
    console.error("Error converting to AVIF:", error);
    next(error);
  }
};

export default upload;
