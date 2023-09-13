import multer from 'multer';

const storage = multer.memoryStorage(); // Store the file in memory

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb({ error: 'Unsupported file format, upload only jpeg, jpg, or png' }, false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
    fileFilter,
});

export default upload;