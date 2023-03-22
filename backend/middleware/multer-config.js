const multer = require('multer');
const MIME_TYPES = require('./mimetypes')


const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        
        if(file.mimetype.startsWith('image')){
            callback(null, 'images')
        }else if(file.mimetype.startsWith('video')){
            callback(null, 'videos')
        }else{
            callback(null, 'ressources')  
        }
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('file');