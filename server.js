const downloadable = require('./controller/downloadable')
const uploadImage = require('./controller/uploadImageController')
const storage = require('./modules/multerStorage')
const express = require('express')
const multer = require('multer')

const upload = multer({ storage })
const app = express() 
app.use(express.static('./public'))


//base route handler
app.get('/', (req, res) => {res.sendFile('./src/index.html', {root:__dirname})})
 
//uploads user selected images to server.
app.post('/upload-img', upload.array('images',10), uploadImage)

//send the files to download the compressed images.
app.get('/downloadable', downloadable)


app.listen(3000, () => {console.log('listening..')})

 
 
