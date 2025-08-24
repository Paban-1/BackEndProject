import { asyncHandler } from "../utils/asyncHandaler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {
  //Get User from frontend
  const { username, email, fullname, password } = req.body;

  //Validation - not empty
  if (
    [fullname, username, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }

  //Check if user exist ?: userName email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user with email or username already exists");
  }
  console.log(req.files);

  //Check for avatar, and cover Img
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  //upload them in to cloudinary, check avatar
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is requred");
  }
  const avatar = await uploadOncloudinary(avatarLocalPath);
  const coverImage = await uploadOncloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is requred");
  }

  //Create user object - create entry in db
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //remove password and refresh token filed from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!createdUser) {
    throw new ApiError(500, "somthing went wrong while registaring User");
  }

  // return res
  return res
    .status(201)
    .json(new ApiResponce(200, createdUser, "user registered successfully"));
});

export { registerUser };
