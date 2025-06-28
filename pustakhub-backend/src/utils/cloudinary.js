// src/utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { ENV } from '../config/env.js';
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET
});

// Upload image to cloudinary
export const uploadImage = async (buffer, folder = 'books', publicId = null) => {
  // Create a new promise
  return new Promise((resolve, reject) => {
    if (!buffer) return reject(new Error('Image buffer is missing'));

    // Upload options
    const uploadOptions = {
      folder: `pustakhub/${folder}`,
      quality: 'auto',
      fetch_format: 'auto'
    };

    // If public id is provided, add it to the upload options
    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    // Upload the image to cloudinary
    cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }).end(buffer);
  });
};

export { cloudinary };
