const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// image in base64
const uploadImage = (image, folderPath = '') => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: folderPath,
  };
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (error, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      return reject({
        message:
          'A problem occuring while uploading the pictures. Please try again.',
      });
    });
  });
};

exports.uploadOneImage = uploadImage;

// images in base64
exports.uploadMultipleImages = (images, folderPath) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base, folderPath));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};
