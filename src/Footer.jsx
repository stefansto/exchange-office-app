import React from 'react';

const Footer = ({info}) => {
    return (
        <>
            <div className='relative h-20'>
                <div className='absolute inset-x-0 bottom-0 h-12'>
                    <p className='text-center'>Logged in as {info}</p>
                </div>
            </div>
        </>
    )
}

export default Footer;