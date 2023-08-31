const {createReadStream,readdir, unlinkSync, rmdirSync} = require('fs')
const {join} = require('path')

const sendImage = (downloadPath, res) => {
    readdir(downloadPath, (err, files) => {
        const imagePath = join(downloadPath, files[0])
        const imageStream = createReadStream(imagePath)
        res.setHeader('Content-Disposition', 'attachment; filename="image.jpg"');
        res.setHeader('Content-Type', 'image/jpeg');
        imageStream.pipe(res)
        imageStream.on('close', ()=> {
            unlinkSync(imagePath)
            rmdirSync(downloadPath)
        }) 
    }) 
    
}

module.exports = sendImage