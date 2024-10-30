const formEl = document.querySelector('main article form');
formEl.addEventListener('submit', login);

function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
    })
        .then(res => {
            if (!res.ok) {
               return res.json()
               .then(data => {
                throw new Error(data.message)
               });
            }

            return res.json()
        })
        .then(data => {
            sessionStorage.setItem('accessToken', data.accessToken);
            location.assign('/');
        })
        .catch(err => alert(err.message));



}

