const btn = document.querySelector('.submit')
const input = document.querySelector('.image-input')
const dBtn = document.querySelector('#download')
const toggleButton = document.querySelector('.toggle-button')
let multiple = false
let fileName

btn.addEventListener('click', async() => {
    console.log(input.files)
    let formData = new FormData();
    if(input.files.length === 1) {
        fileName = input.files[0].name
        console.log(fileName)
    } else {
        fileName = 'images.zip'
    }
    const files = input.files
    input.files = null

    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    input.value = ''
    try {
        fetch('upload-img', {
            method:'POST',
            body: formData
        })
        .then(() => {
            dBtn.style.display = "inline"
        })
        
    } catch (err) {
        console.log(err)
    }

})


dBtn.addEventListener('click', async() => {
    try {
        const response = await fetch('/downloadable')
    
        if (response.ok) {
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = `compressed-${fileName}`
            document.body.appendChild(a)
            a.click()
            URL.revokeObjectURL(url)
        } else {
            console.error('Download request failed')
        }

    } catch (error) {
        console.error('Error during download request:', error)
    }
})


// window.addEventListener('beforeunload', (e)=> {
   
// })