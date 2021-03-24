const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
    uploadDirBuilder: (dirBlock = 'user', itemName, itemType, itemId) => {
        const pathWithoutStatis = path.join(`${dirBlock}`, `${itemId}`, `${itemType}`);
        const fileDir = path.join(process.cwd(), 'static', pathWithoutStatis);

        const fileExtension = itemName.split('.').pop();
        //   other way
        // const fileExtension = path.extname(avatar.name)

        const photoName = `${uuid()}.${fileExtension}`;
        // other way
        // const photoName = `${uuid()}${fileExtension}`;

        const finalFilePath = path.join(fileDir, photoName);
        const uploadPath = path.join(pathWithoutStatis, photoName);

        return { finalFilePath, uploadPath, fileDir };
    },

    deleteDir: async (dirBlock, itemType, itemId) => {
        const pathWithoutStatis = path.join(`${dirBlock}`, `${itemId}`, `${itemType}`);
        const filePath = path.join(process.cwd(), 'static', pathWithoutStatis);

        await fs.rmdir(filePath, { recursive: true });
    }

};
