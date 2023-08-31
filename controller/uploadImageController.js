const compressImageBulk = require('../modules/compressImageBulk')
const path = require('path')

const uploadImage = async(req, res) => {
    if (req.files) { 
        userDir = `user-${(req.ip).replaceAll(':','_')}`
        dirPath = path.resolve(__dirname, '../uploaded-Images', userDir )
        await compressImageBulk(dirPath, userDir)
        res.end()

    } else {
        const err = new Error('Something went wrong')
        res.json(err)
    }
}

module.exports = uploadImage