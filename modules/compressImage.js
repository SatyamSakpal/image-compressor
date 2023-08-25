const sharp = require('sharp')
const path = require('path')

const compressImage = (pathG) => {
    console.log(pathG)
    const file = path.basename(pathG)
    const dirPath = pathG.replace(`/${file}`,'')
    sharp(pathG)
        .jpeg({
            quality:70,
            chromaSubsampling: '4:4:4',
            force: false,
        })
        .toFile(path.resolve(dirPath,`compressed-${file}`))
        .then(() => {
            return {result:'pass'}
        })
        .catch((err) => {
            return err
        })
}

module.exports = compressImage