import React from "react";

const fetchUsers = (setUsers, userRole) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/admin/fetchusers`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({reqRole:userRole})
      })
    .then(response => response.json())
    .then(data => {
        setUsers(data);
    })
    .catch((e)=>{
        console.log('Error fetching users!');
    })
}

const handleChangeActive = (username, status, resetTableFunction, userRole) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/admin/activateuser`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({reqRole:userRole, username: username, status: status})
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

const handleChangeUser = (username, password, role, resetTableFunction, userRole) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/admin/changeuser`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({reqRole:userRole, username: username, newPassword: password, newRole: role})
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

const ChangeUser = ( {users, setUsers, userRole }) => {
    if(users === null){
        fetchUsers(setUsers, userRole);
    } 
    else {
        return(
            <>
                <h2>Change Existing User</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Status</td>
                            <td>Role</td>
                            <td>Change Status</td>
                            <td>Change User</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users ?
                            users.users.map((user, userKey) => {
                                return(
                                    <tr key={userKey}>
                                        <td>{user.username}</td>
                                        <td>{user.active ? 'Active' : 'Deactive'}</td>
                                        <td>{user.role}</td>
                                        <td><button onClick={()=>{handleChangeActive(user.username, !user.active, setUsers, userRole)}}>{ user.active ? 'Deactivate' : 'Activate'}</button></td>
                                        <td><button onClick={()=>{console.log('change', user.id)}}>Change User</button></td>
                                    </tr>
                                );
                            }) : null
                        }
                    </tbody>
                </table>
            </>
        );
    }
}

export default ChangeUser;