const handleChangeUser = (username, password, role, resetTableFunction, setChangeUserForm) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/admin/changeuser`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            newPassword: password,
            newRole: role
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.message){
            alert(data.message);
            resetTableFunction(null);
            setChangeUserForm(null);
        } else if(data.errorMessage){
            alert(data.errorMessage);
        } else {
            throw Error;
        }
    })
    .catch((e)=>{
        console.log('Error changing user data!');
    })
}

export default handleChangeUser;