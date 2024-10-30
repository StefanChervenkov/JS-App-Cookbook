
document.querySelector('main article form').addEventListener('submit', createRecipe);

function createRecipe(e) {
    e.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(e.target).entries());
    formDataObj.ingredients = formDataObj.ingredients.split('\n');
    formDataObj.steps = formDataObj.steps.split('\n');
    if (Object.values(formDataObj).includes('')) {
        alert('All fields must be filled in!');
        return;
    }
    
    const body = JSON.stringify(formDataObj);
    const url = 'http://localhost:3030/data/recipes';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body
    }

    fetch(url, options)
    .then(res => {
        if (!res.ok) {
            return res.json().then(res => {throw new Error(res.message)})
        }
        
        return res.json()
    })
    .then(data => {
        location.assign('/');
        
    })
    .catch(err => alert(err.message))
    
    
    
}