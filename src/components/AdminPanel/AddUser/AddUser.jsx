import React from "react";

const handleAddUser = (reqRole, setUsers) => {
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

const AddUser = ({userRole, setUsers}) => {
    return(
        <div className="border rounded-xl w-full min-h-50 bg-gray-950 pb-2">
            <div className="w-full h-8 text-center mt-3 text-xl">
                <h1>Add A New User</h1>
            </div>
            <div className="w-full min-h-50">
                <div className="w-full h-15 flex justify-center p-2">
                    <input className='w-60 text-center border border-gray-700 focus:border rounded-xl' type="text" id="usernameAdd" placeholder="Username"/>
                </div>
                <div className="w-full h-15 flex justify-center p-2">
                    <input className='w-60 text-center border border-gray-700 focus:border rounded-xl' type="password" id="passwordAdd" placeholder="Password"/>
                </div>
                <div className="w-full h-10 flex justify-center items-center">
                    <label htmlFor="adminrole" className="mr-4">Admin?</label>
                    <input type="checkbox" name="" id="adminrole" />
                </div>
                <div className="w-full h-15 flex justify-center">
                    <input
                        type="button"
                        value="Add User"
                        onClick={()=>{handleAddUser(userRole, setUsers)}}
                        className='w-60 p-2 m-2 border transition bg-blue-950 hover:bg-blue-500 rounded-xl cursor-pointer'
                    />
                </div>
            </div>
        </div>
    );
}

export default AddUser;