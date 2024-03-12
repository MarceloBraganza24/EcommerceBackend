async function logOut () {
    try {
        await fetch('http://localhost:8081/api/sessions/logout', { method: 'POST' }).then(()=>{window.location.href = '/login-view'});
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function addToCart (pid) {
    try {
        const addToCartModal = document.getElementById('addToCartModal');
        addToCartModal.style.display = 'block';
        setTimeout(function(){
            addToCartModal.style.display = 'none'
        }, 3000)
        const productSend = {
            product: {
                _id: pid,
            },
            quantity: 1
        }
        fetch(`http://localhost:8081/api/users`, {
            method: 'PUT',
            body: JSON.stringify(productSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Error:', error.message);
    }
}