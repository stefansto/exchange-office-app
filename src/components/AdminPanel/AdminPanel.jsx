import React from "react";
import AddUser from './AddUser/AddUser';
import ChangeUser from './ChangeUser/ChangeUser';

const AdminPanel = ( {closeAdminPanel, users, setUsers, changeUserForm, setChangeUserForm} ) => {
    return(
        <div className='w-full flex justify-center'>
            <div className="w-200">
                <h1 className="text-center pt-3 text-2xl mb-5 font-bold">Admin Panel</h1>
                <a href="#" onClick={closeAdminPanel} className='bg-red-900 right-0 top-0 fixed p-2 m-2 border transition hover:bg-red-700 rounded-xl cursor-pointer'>Close</a>
                <AddUser
                    setUsers={setUsers}
                />
                <ChangeUser
                    users={users}
                    setUsers={setUsers}
                    changeUserForm={changeUserForm}
                    setChangeUserForm={setChangeUserForm}
                />
            </div>
        </div>
    );
}

export default AdminPanel;