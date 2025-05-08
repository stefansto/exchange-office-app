import React from 'react';

const Footer = ({loggedInUser}) => {
    return (
        <div className='fixed bottom-0 w-screen bg-slate-950'>
            <div className='relative h-20'>
                <div className='absolute inset-x-0 bottom-0 h-12'>
                    <p className='text-center'>Logged in as {loggedInUser}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;