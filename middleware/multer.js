import multer from 'multer';

const storage = multer.memoryStorage();

const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //limit 5MB size
    },
    fileFilter: (req, file, cb) => {
        // Only accept image files
        if (!file.mimetype.startsWith('image')) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    }
});

export default uploads;
