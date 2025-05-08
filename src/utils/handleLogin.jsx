const handleLogin = (username, password, setLogin, setRole) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/login`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.user){
            setRole(data.role);
            setLogin(data.user);
        } else if(data.errorMessage){
            alert(data.errorMessage);
        } else {
            throw Error;
        }
    })
    .catch((e)=>{
        alert('Server error, please try again later!');
    })
}

export default handleLogin;