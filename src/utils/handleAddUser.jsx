const handleAddUser = (setUsers) => {
    let username = document.getElementById('usernameAdd').value;
    let password = document.getElementById('passwordAdd').value;
    let admin = document.getElementById('adminrole').checked;

    if(/[\w\.]{4,16}/.test(username) && /[\w\.]{4,16}/.test(password)){
        fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/admin/adduser`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                newUsername: username,
                newPassword: password,
                newRole: admin ? 'admin' : 'user'
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.errorMessage){
                alert(data.errorMessage);
            } else if(data.message){
                alert(data.message);
            } else {
                throw Error;
            }
        })
        .catch((e)=>{
            alert('Server error, please try again later!');
        })
        .finally(()=>{
            setUsers(null);
            document.getElementById('usernameAdd').value = '';
            document.getElementById('passwordAdd').value = '';
            document.getElementById('adminrole').checked = false;
        })
    } else {
        alert('Invalid input!');
    }
}

export default handleAddUser;