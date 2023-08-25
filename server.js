const imgCompressorController = require('./controller/imgCompressorController')
const bodyParser = require('body-parser')
const express = require('express')

const app = express() 
app.use(bodyParser.json())
 
app.get('/', (req, res) => {
    res.sendFile('./src/index.html', {root:__dirname})
})

app.post('/image-compress',imgCompressorController)

app.listen(3000, () => {
    console.log('listening..')
})

 
 
 // sharp('./Images/lone-tree.jpg') 
    //     .png({
    //         quality: 50,
    //     })
    //     .toFile('./Images/output1.png')


///