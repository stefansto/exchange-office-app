import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'black',
    padding: '30px',
    zIndex: 1000,
    color:'white'
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 1000,
    color:'white'
}

const Modal = ({openModal, children, onClose}) => {
    if(!openModal) return null;
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLE} />
            <div style={MODAL_STYLES} className='border rounded-lg w-150 h-80'>
               
                <div className='w-full'>
                    <button onClick={onClose} className='border w-30 h-10 rounded-md hover:bg-red-800 ml-100 cursor-pointer'>Close</button>
                </div>
                <div className='w-full h-55 p-5'>
                    {children}
                </div>
                
                
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;