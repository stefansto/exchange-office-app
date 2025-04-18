import React from "react";

const Transactions = (props) => {
    let transactionArray = [];
    if(props.transactions){
        transactionArray = props.transactions;
    }
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
                            transactionArray.map((transaction, transactionKey)=>{
                                return(<tr className="border hover:bg-blue-700" key={transactionKey}>
                                        <td className="border p-2">{transaction._id}</td>
                                        <td className="border p-2">{transaction.type}</td>
                                        <td className="border p-2">{transaction.date}</td>
                                        <td className="border p-2">{transaction.cashier}</td>
                                        <td className="border p-2">{transaction.currencyIn} {transaction.currencyInAmmount}</td>
                                        <td className="border p-2">{transaction.rate}</td>
                                        <td className="border p-2">{transaction.currencyOut} {transaction.currencyOutAmmount}</td>
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