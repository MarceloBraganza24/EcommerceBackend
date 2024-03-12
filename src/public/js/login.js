const form = document.getElementById('loginForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key]=value);
    fetch('http://localhost:8081/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {window.location.href = '/products-view'})
});