import cloudinary from 'cloudinary';
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const upload = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file.path,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        public_id: result.public_id,
                        secure_url: result.secure_url,  
                    });
                }
            },
            {
                resource_type: "auto",  
                folder: folder,
            }
        );
    });
};

export { upload, cloudinary };
