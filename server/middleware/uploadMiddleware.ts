// const express, { Request, Response } = require('express')
import { Request } from "express"
const multer = require('multer')
// const upload = multer({ dest: 'uploads/images' })
const path = require('path')
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File,
        callback: DestinationCallback) => {
        console.log('heres the file in uploads: ', file)
        callback(null, 'uploads/');
    },
    filename: (req: Request, file: Express.Multer.File,
        callback: FileNameCallback) => {
        callback(null, `${file?.fieldname}_${Date.now()}${path.extname(file?.originalname)}`);
        // callback(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


module.exports = upload;

/**
 * https://www.youtube.com/watch?v=jn3tYh2QQ-g&ab_channel=TechnicalBabaji
 * https://www.youtube.com/watch?v=62YETqynpcs&t=258s&ab_channel=TechFounder
 * https://www.npmjs.com/package/multer
 */