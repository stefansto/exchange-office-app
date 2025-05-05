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

const handleChangeUser = (username, password, role, resetTableFunction, userRole, setChangeUserForm) => {
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

const ChangeUser = ({ users, setUsers, userRole, changeUserForm, setChangeUserForm }) => {
    if(users === null){
        fetchUsers(setUsers, userRole);
    } else {
        if(changeUserForm === null){
            return(
                <>
                    <h2 className="pt-5 text-center text-2xl">User List</h2>
                    <div className='pt-5 justify-center flex text-center'>
                        <table className="w-900 bg-gray-950">
                            <thead className="bg-zinc-950 text-xl">
                                <tr>
                                    <td className="border p-2">Username</td>
                                    <td className="border p-2">Status</td>
                                    <td className="border p-2">Role</td>
                                    <td className="border p-2">Change Status</td>
                                    <td className="border p-2">Edit User</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users ?
                                        users.users.map((user, userKey) => {
                                            return(
                                                <tr key={userKey}>
                                                    <td className="border p-2">{user.username}</td>
                                                    <td className="border p-2">{user.active ? 'Active' : 'Deactived'}</td>
                                                    <td className="border p-2">{user.role}</td>
                                                    <td className="border p-2">
                                                        <button 
                                                            onClick={()=>{
                                                                handleChangeActive(user.username, !user.active, setUsers, userRole)}}
                                                            className='p-2 m-2 bg-orange-950 w-30 border transition hover:bg-orange-800 rounded-xl cursor-pointer'
                                                        >
                                                            { user.active ? 'Deactivate' : 'Activate'}
                                                        </button>
                                                    </td>
                                                    <td className="border p-2">
                                                        <button
                                                            onClick={()=>{setChangeUserForm({username: user.username, role: user.role})}}
                                                            className='p-2 m-2 bg-emerald-950 border transition hover:bg-emerald-800 rounded-xl cursor-pointer'
                                                        >
                                                            Change User
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            ); 
        } else {
            return(
                <>
                    <div className='w-200 h-100 border justify-center flex rounded-xl bg-gray-950'>
                        <div className="text-center mt-5">
                            <p className="text-xl">Change user: {changeUserForm.username}</p>
                            <div className="w-full">
                                <input
                                    type="password"
                                    id="passwordChange"
                                    placeholder="Password"
                                    className='w-60 p-2 m-2 mt-10 text-center border border-gray-700 focus:border rounded-xl'
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="password"
                                    id="passwordChangeConfirm"
                                    placeholder="Retype Password"
                                    className='w-60 p-2 m-2 text-center border border-gray-700 focus:border rounded-xl'
                                />
                            </div>
                            <div className="mt-2 mb-2">
                                <input
                                    type="radio"
                                    name="roleChange"
                                    id="adminCheck"
                                    value="admin"
                                    
                                    defaultChecked={changeUserForm.role === 'admin'? true: false}
                                />
                                <label htmlFor="adminCheck" className="mr-5">
                                    Admin
                                </label>
                                <input
                                    type="radio"
                                    name="roleChange"
                                    id="userCheck"
                                    value="user"
                                    defaultChecked={changeUserForm.role === 'user'? true: false}
                                />
                                <label htmlFor="userCheck">
                                    User
                                </label>
                                <input
                                    type="hidden"
                                    id="hiddenUsername"
                                    value={changeUserForm.username}
                                />
                            </div>
                            <div className="w-full">
                                <button
                                    className='w-60 p-2 m-2 border transition hover:bg-green-900 rounded-xl cursor-pointer'
                                    onClick={
                                        ()=>{
                                            let password = document.getElementById('passwordChange').value;
                                            let passwordConfirm = document.getElementById('passwordChangeConfirm').value;
                                            let role = document.getElementById('adminCheck').checked ? 'admin' : 'user';
                                            let username = document.getElementById('hiddenUsername').value;

                                            if(password === passwordConfirm){
                                                if(/[\w\.]{4,16}/.test(password)){
                                                    handleChangeUser(username, password, role, setUsers, userRole, setChangeUserForm);
                                                } else {
                                                    alert('Invalid input!');
                                                }
                                            } else {
                                                alert('Passwords don\'t match!');
                                            }
                                        }
                                    }
                                >
                                    Submit
                                </button>
                            </div>
                            <div className="w-full">
                                <button
                                    className='w-60 p-2 m-2 border transition hover:bg-red-800 rounded-xl cursor-pointer'
                                    onClick={
                                        ()=>{
                                            setChangeUserForm(null)
                                        }
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default ChangeUser;