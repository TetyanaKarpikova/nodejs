const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES
} = require('../constant/constant');
const errorMessage = require('../error/error.messages');

module.exports = {
    checkFileMiddleware: (req, res, next) => {
        try {
            const { files } = req;
            const preferL = 'en';

            const docs = [];
            const photos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, size } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) { // PHOTOS
                    if (PHOTO_MAX_SIZE < size) {
                        throw new Error(`${errorMessage.FILE_TOO_BIG[preferL]}`);
                    }
                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) { // DOCS
                    if (FILE_MAX_SIZE < size) {
                        throw new Error(errorMessage.FILE_TOO_BIG[preferL]);
                    }
                    docs.push(allFiles[i]);
                } else {
                    throw new Error(errorMessage.NOT_VALID_FILE[preferL]);
                }
            }

            req.docs = docs;
            req.photos = photos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkFileAvatar: (req, res, next) => {
        try {
            const preferL = 'en';
            if (req.photos.length > 1) {
                throw new Error(errorMessage.ONLY_ONE_PHOTO[preferL]);
            }

            [req.avatar] = req.photos;

            next();
        } catch (e) {
            next(e);
        }
    }
};
