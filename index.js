const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var userController = require('./controllers/user.controller.js');
var postController = require('./controllers/post.controller.js');
const userModel = require('./models/user.model');
const postModel = require('./models/posts.model');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const multer = require('multer');
var fileExtension = require('file-extension')

var app = express();

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));


app.use('/posts', postRoutes);
app.use('/users', userRoutes);


var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'my_uploaded_files')
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        cb(undefined, true)
    }
})

app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    console.log(req);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

app.listen(3000);

























