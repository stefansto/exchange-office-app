import React from "react";

const Transactions = (props) => {
    return(
        <>
            <div className="center flex justify-content w-150 m-2 mb-25">
                <table className="border w-900">

                    <thead>
                        <tr className="border">
                            <th className="border p-2">Transaction ID</th>
                            <th className="border p-2">Transaction Type</th>
                            <th className="border p-2">Date and Time</th>
                            <th className="border p-2">Cashier</th>
                            <th className="border p-2">Currency Input</th>
                            <th className="border p-2">Rate</th>
                            <th className="border p-2">Currency Output</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            props.transactions.map((x, y)=>{
                                return(<tr className="border hover:bg-blue-700" key={y}>
                                        <td className="border p-2">{x.id}</td>
                                        <td className="border p-2">{x.type}</td>
                                        <td className="border p-2">{x.date}</td>
                                        <td className="border p-2">{x.cashier}</td>
                                        <td className="border p-2">{x.currIn} {x.ammountIn}</td>
                                        <td className="border p-2">{x.rate}</td>
                                        <td className="border p-2">{x.currOut} {x.ammountOut}</td>
                                    </tr>);
                            })
                        }
                        
                    </tbody>
                    
                </table>
            </div>
        </>
    );
}

export default Transactions;