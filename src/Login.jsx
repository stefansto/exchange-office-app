import React from 'react';
import { placeholderUser } from './data/placeholderUser';

const Login = (props) => {

    return(
        <div className='w-150 h-100 border justify-center flex rounded-xl'>
            <form className='columns-1' method='POST' action='#'>
                <input type='text' placeholder='Username' id='user' className='w-full p-2 m-2 mt-20 text-center border border-gray-700 focus:border rounded-xl'/>
                <input type='password' placeholder='Password' id='pass' className="w-full p-2 m-2 text-center  border border-gray-700 focus:border rounded-xl"/>
                <button 
                    className='w-full p-2 m-2 border transition hover:bg-black rounded-xl cursor-pointer'
                    onClick={(e)=>{
                        e.preventDefault();
                        if(/[\w\.]{4,16}/.test(document.getElementById('user').value) && /[\w\.]{4,16}/.test(document.getElementById('pass').value)){
                            let user = document.getElementById('user').value;
                            let pass = document.getElementById('pass').value;
                            let foundUser = false;
                            placeholderUser.forEach(element => {
                                if(element.username == user){
                                    if(element.password == pass){
                                        foundUser = true;
                                        props.login(user);
                                    }
                                }
                            });
                            if(!foundUser)alert('Invalid credentials');
                        }
                        else{
                            alert('Invalid input');
                        }
                        
                    }}>
                Login
                </button>
            </form>
        </div>
    );
}

export default Login