import React from 'react';

const Currency = (props) => {
        return(
            <>
                <div className='items-center w-50 h-20 p-2 border text-center rounded-lg columns-2 '>
                    <img className='w-24 h-full' src={`/assets/${props.img}`} alt={props.img} />
                    <div >
                        <p className='p-1'>{props.name}</p>
                        <p>{props.ammount}</p>
                    </div>
                </div>
            </>
        );
}

export default Currency;