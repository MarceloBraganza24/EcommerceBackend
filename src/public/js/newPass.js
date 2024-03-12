const form = document.getElementById('newPassForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key]=value);
    fetch('/api/users/new-pass', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(window.location.replace('/login-view'))
});