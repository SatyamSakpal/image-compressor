const archiver = require('archiver')
const path = require('path')
const fs = require('fs')


const sendZip = (downloadPath, res) => {
    try {
        const output = fs.createWriteStream('images.zip')
        const archive = archiver('zip', {
            zlib: { level: 9 }, 
        })

        fs.readdir(downloadPath, (err, files) => {
            files.forEach((file) => {
                archive.file(path.join(downloadPath, file), { name: file })
            })

            archive.pipe(output)
            archive.finalize()
            res.attachment('images.zip')
    
            output.on('close', () => {
                files.forEach((file) => {
                    fs.unlinkSync(path.join(downloadPath,file))
                })
                fs.rmdirSync(downloadPath)
                res.sendFile(path.resolve(__dirname, '../images.zip'))
            })
        })
    } catch(err) {
        res.send(err)
    }
    
}

module.exports = sendZip