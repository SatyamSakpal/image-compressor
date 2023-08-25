const fs = require('fs')

const identifyPath = (path) => {
    return new Promise((resolve, reject) => {
        fs.lstat(path, (err, stats) => {
            if (err)
                return reject(err)
            if (stats.isFile())
                return resolve(0);
            if (stats.isDirectory())
                return resolve(1);
        })
    })
}

module.exports = identifyPath