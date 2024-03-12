const updateUser = (uid) => {
    const roleUser = document.getElementById('roleUser' + uid).value;
    fetch(`http://localhost:8081/api/users?uid=${uid}&&role=${roleUser}`, {
        method: 'PUT'
    }).then(setTimeout(function(){window.location.reload()}, 1000))
}

const deleteUser = (id) => {
    fetch(`http://localhost:8081/api/users/delete-one/${id}`, {
        method: 'DELETE'
    }).then(window.location.reload())
}