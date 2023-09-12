import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimType === "/image/jpg" || file.mimType === "/image/jpeg" || file.mimType === "/image/png" || file.mimType === "/image/jpg") {
        cb(null, true)
    
    } else (
        {'error': "Unsupported file format, upload only jpeg, jpg, or png"},
        false
    )
}

const upload = multer({
    storage,
    limits: { fieldSize: 1024 * 1024 },
    fileFilter
})

export default upload