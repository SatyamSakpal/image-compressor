const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const compressImageBulk = (dirPath) => {
    try {
        fs.readdir(dirPath, (err, files) => {
            files.forEach(file => {
                console.log(path.resolve(dirPath,file))
                let absFilePath = path.resolve(dirPath,file)
              
                sharp(absFilePath)
                    .jpeg({
                        quality:70,
                        chromaSubsampling: '4:4:4',
                        force: false,
                    })
                    .toFile(path.resolve(dirPath,`compressed-${file}`))
                    .catch((err) => {
                        return
                    })
              
            })
            return {result:'pass'}
        }) 

    } catch (err) {
        return err
    }
    

}

module.exports = compressImageBulk

