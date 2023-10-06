const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true,
  secure: false,
});

// image in base64
const uploadImage = async (image, folderPath = '') => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: folderPath,
    width: 1500,
    heigth: 1500,
    crop: 'scale',
    format: 'webp',
    quality: 90,
  };

  try {
    const response = await cloudinary.uploader.upload(
      image,
      options,
      (error, result) => {
        if (result && result.secure_url) {
          return { status: 'success', url: result.secure_url };
        }
        return;
      }
    );

    return response;
  } catch (error) {
    if (error.message.includes('File size too large.'))
      return {
        status: 'fail',
        message: 'File size too large. Maximum size is 10 MB.',
      };

    // return error;
    return {
      status: 'fail',
      message: error.message,
      // error,
      // message:
      //   'An unexpected problem occurred while uploading the pictures. Please try again.',
    };
  }
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

const getPublicIdFromSecureUrl = (secureUrl) => {
  let publicUrl = secureUrl
    .split(process.env.CLOUDINARY_FOLDER)[1]
    .split('.webp')[0];
  return process.env.CLOUDINARY_FOLDER + publicUrl;
};

const deleteImage = (secureUrl) => {
  const publicId = getPublicIdFromSecureUrl(secureUrl);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (result && result.result === 'ok') {
        return resolve('Image deleted successfully.');
      }
      return resolve('Image not found.');
      // return reject({
      //   message:
      //     'A problem occurred while deleting the image. Please try again.',
      // });
    });
  });
};

exports.deleteOneImage = deleteImage;

exports.deleteMultipleImages = (secureUrls) => {
  return new Promise((resolve, reject) => {
    const deletions = secureUrls.map((publicId) => deleteImage(publicId));
    Promise.all(deletions)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};
