const path = require('path') 
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirName = path.join('./uploaded-Images', `user-${(req.ip).replaceAll(':','_')}` )

        if(!fs.existsSync(dirName)) {
            fs.mkdir(dirName, (err) => {
                if(err) {
                    console.log(err)
                }
            })            
        }

        console.log(dirName)
        cb(null, dirName)
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname)
        const fname = `${file.originalname.replace(extension,'')}${extension}`
        cb(null, fname)
    }
})

module.exports = storage