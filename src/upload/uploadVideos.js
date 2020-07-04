const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const crypto = require('crypto');

const s3 = multerS3({
    s3: new aws.S3(),
    bucket: 'aulas-ws',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if(err) cb(err);
            
            const part = file.originalname.split('.');
            const extension = part[part.length - 1];
        
            const photoName = `${hash.toString('hex')}.${extension}`;
            cb(null, photoName);
        });
    }
});

module.exports = {
    storage: s3,
    limits: {
        fileSize: 100 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'video/mp4',
        ];
        if(allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }else {
            cb(new Error('Formato de video inválido'));
        }
    }
};