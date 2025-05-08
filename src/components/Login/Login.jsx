import React from 'react';
import handleLogin from '../../utils/handleLogin';

const Login = ( {setLoggedInUser, setUserRole} ) => {

    return(
        <div className='pt-20 justify-center flex'>
            <div className='w-150 h-100 border justify-center flex rounded-xl'>
                <form className='columns-1' method='POST' action='#'>
                    <input type='text' placeholder='Username' id='user' className='w-full p-2 m-2 mt-20 text-center border border-gray-700 focus:border rounded-xl'/>
                    <input type='password' placeholder='Password' id='pass' className="w-full p-2 m-2 text-center  border border-gray-700 focus:border rounded-xl"/>
                    <button 
                        className='w-full p-2 m-2 border transition hover:bg-black rounded-xl cursor-pointer'
                        onClick={(e)=>{
                            e.preventDefault();
                            if(/[\w\.]{4,16}/.test(document.getElementById('user').value) && /[\w\.]{4,16}/.test(document.getElementById('pass').value)){
                                handleLogin(document.getElementById('user').value, document.getElementById('pass').value, setLoggedInUser, setUserRole);
                            } else {
                                alert('Invalid input');
                            }
                        }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;