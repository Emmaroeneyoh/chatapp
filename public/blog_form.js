const form = document.querySelector('.form')
const title_error = document.querySelector('.title')
const body_error = document.querySelector('.body')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const title = form.title.value
    const body = form.body.value
    console.log('form worked', title, body)

    const res = await fetch('/authe/form/:id', {
        method:'POST',
        body:JSON.stringify({title, body,  }),
        headers:{'Content-Type': 'application/json'}
    })
    const data = await res.json()
    console.log(data)
    if(data.story) {
        location.assign('/authe/home')
    }
    if(data.errors) {
        title_error.innerHTML = data.errors.title
        body_error.innerHTML = data.errors.body
        
    } else {
        title_error.innerHTML = ''
        body_error.innerHTML = ''
      
    }
})