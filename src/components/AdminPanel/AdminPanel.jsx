import React from "react";
import AddUser from './AddUser/AddUser';
import ChangeUser from './ChangeUser/ChangeUser';

const AdminPanel = ( {closeAdminPanel, userRole, setUsers, users} ) => {
    return(
        <>
            <h1>Admin Panel</h1>
            <a href="#" onClick={closeAdminPanel} >Back</a>
            <AddUser userRole={userRole} />
            <ChangeUser userRole={userRole} setUsers={setUsers} users={users} />
        </>
    );
}

export default AdminPanel;