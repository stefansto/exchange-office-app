import React from "react";
import handleAddUser from "../../../utils/handleAddUser";

const AddUser = ({setUsers}) => {
    return(
        <div className="mb-6">
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
                            onClick={()=>{handleAddUser(setUsers)}}
                            className='w-60 p-2 m-2 border transition bg-blue-950 hover:bg-blue-500 rounded-xl cursor-pointer'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;