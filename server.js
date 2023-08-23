const express = require('express')
const path = require('path')
const sharp = require('sharp')
const app = express() 
// app.set ('view engine', 'ejs')
// app.set('views','src')

app.listen(3000, () => console.log('listening..'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'src/index.html'))
})