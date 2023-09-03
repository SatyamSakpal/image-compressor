const inputBtn = document.querySelector('.image-input-btn')
const input = document.querySelector('.image-input')
const dBtn = document.querySelector('.image-download-btn')
const toast = document.getElementById("toast");
const toastDl = document.getElementById("toast-dl");
let multiple = false
let fileName

inputBtn.addEventListener('click', ()=> {
    input.click()
    
})


input.addEventListener('change', async() => {
    inputBtn.setAttribute('disabled','disabled')
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
    toast.className = "show";
    try {
        fetch('upload-img', {
            method:'POST',
            body: formData
        })
        .then(() => {
            setTimeout(() => {
                dBtn.style.display = 'block'
                toast.className = toast.className.replace("show", "hide")
            },1000)
        })
        
    } catch (err) {
        console.log(err)
    }

})
 

dBtn.addEventListener('click', async() => {
    try {
        toastDl.className = 'show'
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
            toastDl.className = toastDl.className.replace("show", "hide")
            dBtn.style.display = 'none'
            inputBtn.removeAttribute('disabled')
        } else {
            console.error('Download request failed')
        }

    } catch (error) {
        console.error('Error during download request:', error)
    }
})


// window.addEventListener('beforeunload', (e)=> {
   
// })