const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'public/uploads/images'); 
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, 'public/uploads/videos'); 
        } else {
            cb(null, false);
        }

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }

};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024
    }
});

module.exports = upload;
