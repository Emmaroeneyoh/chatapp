const form = document.querySelector('.form')
 const email_error = document.querySelector('.email')
 const password_error = document.querySelector('.password')
 const username_error = document.querySelector('.username')
 const gender_error = document.querySelector('.gender')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
   
    
    //
    const email = form.email.value
    const password = form.password.value
    const username = form.username.value
    const gender = form.gender.value
    console.log('signup worked', email,password,username,gender)

try {
    const res = await fetch('/authe/signup', {
        method:'POST',
        body:JSON.stringify({email,password,username,gender}),
        headers:{'Content-Type': 'application/json'}
    })

    const data = await res.json()
    console.log(data)
    if(data.User) {
        location.assign('/authe/home')
    }
    if(data.errors) {
        email_error.innerHTML = data.errors.email
        password_error.innerHTML = data.errors.password
        username_error.innerHTML = data.errors.username
        gender_error.innerHTML = data.errors.gender
    } else {
        email_error.innerHTML = ''
        password_error.innerHTML = ''
        username_error.innerHTML = ''
        gender_error.innerHTML = ''
    }


} catch (err) {
    
}


})