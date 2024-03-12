const form = document.getElementById('resetPassForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key]=value);
    fetch('/api/users/password-link', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
});