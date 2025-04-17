import React from "react";

const Header = (prop) => {
        return (
        <>
            <div className="h-10 flex justify-between mb-5">
                <div className="p-4">
                        <p>Exchange Office</p>
                </div>

                <div className="p-4">
                        <a href='#' onClick={prop.clickExch} className="m-4 hover:text-blue-200">Exchange</a>
                        <a href='#' onClick={prop.clickInput} className="m-4 hover:text-blue-200">Input</a>
                        <a href='#' onClick={prop.clickOutput} className="m-4 hover:text-blue-200">Output</a>
                </div>
                
                <div className="p-4">
                        <a href='#' onClick={prop.clickLogout} className="hover:text-red-400">Logout</a>
                </div>
            </div>
        </>);
        
}

export default Header;