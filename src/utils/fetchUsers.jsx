const fetchUsers = (setUsers) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/admin/fetchusers`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        setUsers(data);
    })
    .catch((e)=>{
        console.log('Error fetching users!');
    })
}

export default fetchUsers;