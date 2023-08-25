const identifyPath = require('../modules/identifyPath')
const compressImage = require('../modules/compressImage')
const compressImageBulk = require('../modules/compressImageBulk')


const imgCompressorController = async(req, res) => {
    let path = req.body.url.replaceAll('\\','/').replaceAll('"','')
    let pathType = await identifyPath(path)
    let cb
    console.log(pathType)
    if(pathType === 0) {
        cb = compressImage(path)
    }else if(pathType === 1) {
        cb = compressImageBulk(path)
    }else {
        throw new Error('Path Invalid');
    }
    res.json(cb)
}

module.exports = imgCompressorController