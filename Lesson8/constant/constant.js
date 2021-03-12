module.exports = {
    AUTHORIZATION: 'Authorization',

    PHOTO_MAX_SIZE: 3 * 1024 * 1024, // 3MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/vnd.microsoft.icon', //  ICO[12]
        'image/vnd.wap.wbmp', // WBMP
        'image/webp' // WebP
    ],
    DOCS_MIMETYPES: [
        'application/pdf', // Portable Document Format, PDF (RFC 3778)
        'application/excel', // .xls
        'application/vnd.ms-excel', // .xls
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    ]
};
