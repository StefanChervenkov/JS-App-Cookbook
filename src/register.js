
document.querySelector('main article form').addEventListener('submit', register);


function register(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    if (formDataObject.password !== formDataObject.rePass) {
        alert('Passwords do not match!');
        return;
    }
    
    const registerData = { email: formDataObject.email, password: formDataObject.password };

    fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(errData => {
                    throw new Error(errData.message)
                })
            }

            return res.json()
        })
        .then(data => {
            sessionStorage.setItem('accessToken', data.accessToken);
            location.assign('/')
        })
        .catch(err => { alert(err.message) });

}
