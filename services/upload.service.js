const multer = require('multer');
const sharp = require('sharp');
const ErrorResponse = require('../middlewares/ErrorResponse');

//Khai lưu trữ file : bộ nhớ
const multerStorage = multer.memoryStorage();
//Lọc với file có dạng image
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startWith('image')){
        cb(null,true);
    }else{
        cb(
            new ErrorResponse('Not an image! Please upload only images.', 400),
            false
        );
    }
}
const upload = multer({
    storage : multerStorage,
    fileFilter : multerFilter
})
//xử lý file tải lên từ trường có tên 'avatar'
const uploadUserAvatar = upload.single('avatar');
//Thay đổi kích thước ảnh
const resizeAvatar = async(req,res,next)=>{
    if(!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .size(500,500)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/img/users/${req.file.filename}`);
    next();
}

module.exports = {uploadUserAvatar,resizeAvatar}