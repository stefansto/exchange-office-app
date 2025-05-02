import React from "react";

const handleAddUser = (reqRole) => {
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
                newRole: admin ? 'admin' : 'user',
                reqRole: reqRole
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
    } else {
        alert('Invalid input!');
    }
}

const AddUser = ({userRole}) => {
    return(
        <>
            <h1>Add A New User</h1>
            <div>
                <label htmlFor="usernameAdd">Username:</label>
                <input type="text" id="usernameAdd"/>
            </div>
            <div>
                <label htmlFor="passwordAdd">Password:</label>
                <input type="password" id="passwordAdd"/>
            </div>
            <div>
                <label htmlFor="adminrole">Admin?</label>
                <input type="checkbox" name="" id="adminrole" />
            </div>
            <div>
                <input type="button" value="Add User" onClick={()=>{handleAddUser(userRole)}} />
            </div>
        </>
    );
}

export default AddUser;