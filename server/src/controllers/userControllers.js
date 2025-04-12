import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ accountVerified: true });
  res.status(200).json({
    success: true,
    users,
  });
});

export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload an image", 400));
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const isRegistered = await User.findOne({ email, accountVerified: true });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters", 400)
    );
  }

  const { avatar } = req.files;
  const allowedFormat = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormat.includes(avatar.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Upload image to Cloudinary
  let cloudinaryRes;
  try {
    cloudinaryRes = await cloudinary.uploader.upload(avatar.tempFilePath, {
      folder: "Library_Management_System_Admin_Avatars",
    });
  } catch (error) {
    console.error("Cloudinary error", error);
    return next(
      new ErrorHandler("Failed to upload avatar image to Cloudinary", 500)
    );
  }

  if (!cloudinaryRes || cloudinaryRes.error) {
    return next(
      new ErrorHandler("Failed to upload avatar image to Cloudinary", 500)
    );
  }

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "Admin",
    accountVerified: true,
    avatar: {
      public_id: cloudinaryRes.public_id,
      url: cloudinaryRes.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    admin,
  });
});
