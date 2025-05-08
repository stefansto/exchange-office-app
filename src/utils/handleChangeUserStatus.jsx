const handleChangeUserStatus = (username, status, resetTableFunction) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/admin/activateuser`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            status: status 
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.message){
            alert(data.message);
            resetTableFunction(null);
        } else if(data.errorMessage){
            alert(data.errorMessage);
        } else {
            throw Error;
        }
    })
    .catch((e)=>{
        console.log('Error changing status!');
    })
}

export default handleChangeUserStatus;