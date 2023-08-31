const sendImage = require('../modules/sendImage')
const sendZip = require('../modules/sendZip')
const path = require('path')
const fs = require('fs')

const downloadable = async(req, res) => {
    console.log(req.ip)
    try {
        const downloadPath = path.resolve(__dirname, '../downloads', `user-${(req.ip).replaceAll(':','_')}`) 
        fs.readdir(downloadPath, (err, files) => {
            if(files.length === 1) {
                sendImage(downloadPath, res)
            } else {
                sendZip(downloadPath, res)
            }
        })
        
    } catch(err){
        res.send(err)
    }
    

}

module.exports = downloadable

