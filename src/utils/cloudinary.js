import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOncloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload the file on cloudinary
    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //'file has been uploaded succesfully
    console.log("file is uploaded on cloudinary", responce.url);
    return responce;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the localy saved tempo file as the upload opration got faild
    return null;
  }
};
export { uploadOncloudinary };
