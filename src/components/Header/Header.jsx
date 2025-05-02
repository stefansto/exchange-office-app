import React from "react";

const Header = (props) => {
        return (
        <>
            <div className="h-10 flex justify-between mb-5">
                <div className="p-4">
                        <p>Exchange Office</p>
                </div>

                <div className="p-4">
                        <a href='#' onClick={props.clickExch} className="m-4 hover:text-blue-200">Exchange</a>
                        <a href='#' onClick={props.clickInput} className="m-4 hover:text-blue-200">Input</a>
                        <a href='#' onClick={props.clickOutput} className="m-4 hover:text-blue-200">Output</a>
                        { props.userRole ==='admin' ? <a href='#' onClick={props.openAdminPanel} className="m-4 hover:text-blue-200">AdminPanel</a> : null }
                </div>
                
                <div className="p-4">
                        <a href='#' onClick={props.clickLogout} className="hover:text-red-400">Logout</a>
                </div>
            </div>
        </>);
        
}

export default Header;