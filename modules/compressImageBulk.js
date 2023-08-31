const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const compressImageBulk = async(dirPath, userDir) => {
    try {
        const toPath = path.resolve(dirPath,'../../downloads')
        await compressImages(toPath)
    } catch (err) {
        return err
    }  

}

const compressImages = async(toPath)=> {
    fs.readdir(dirPath, (err, files) => {
        const outputDir = path.join(toPath, userDir)

        if(!fs.existsSync(outputDir)) {
            fs.mkdir(outputDir, (err) => {
                if(err) {
                    console.log(err)
                }
            })    
        }
            
        files.forEach(file => {
            // console.log(path.resolve(dirPath,file))
            let absFilePath = path.resolve(dirPath,file)
          
            sharp(absFilePath)
                .jpeg({
                    quality:70,
                    chromaSubsampling: '4:4:4',
                    force: false,
                })
                .toFile(path.resolve(outputDir,`compressed-${file}`))
                .then(() => {
                    fs.unlinkSync(absFilePath)
                    fs.rmdirSync(dirPath)
                })
                .catch((err) => {
                    return
                })
            
        })

    }) 
}

module.exports = compressImageBulk

