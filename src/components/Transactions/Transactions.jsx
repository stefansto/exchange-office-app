import React from "react";
import Filter from "../Filter/Filter";
import { sortCashier, sortDateTime, sortID, sortInput, sortOutput, sortRate, sortType } from "../../utils/transactionSortingFunctions";

const Transactions = (props) => {
    
    let transactionArray = [];
    if(props.transactions){
        if(props.isSorted){
            transactionArray = props.isSorted.sortedTransaction;
        } else {
            transactionArray = props.transactions;
        }
    }
    
    return(
        <>
            <Filter
                currencies={props.currencies}
                setTransactions={props.setTransactions}
                setIsSorted={props.setIsSorted}
                setLoggedInUser={props.setLoggedInUser}
            />
            <div className='min-h-100'>
                <div className='flex justify-around mt-10 '>
                    <div className="center flex justify-content w-200 m-2 mb-25">
                        <table className="border w-900">
                            <thead>
                                <tr className="border">
                                    <th className="border p-2 hover:bg-green-800 cursor-pointer" onClick={() => {sortID(props.setIsSorted, transactionArray, props.isSorted)}}>Transaction ID</th>
                                    <th className="border p-2 hover:bg-green-800 cursor-pointer" onClick={() => {sortType(props.setIsSorted, transactionArray, props.isSorted)}}>Transaction Type</th>
                                    <th className="border p-2 hover:bg-green-800 cursor-pointer" onClick={() => {sortDateTime(props.setIsSorted, transactionArray, props.isSorted)}}>Date and Time</th>
                                    <th className="border p-2 hover:bg-green-800 cursor-pointer" onClick={() => {sortCashier(props.setIsSorted, transactionArray, props.isSorted)}}>Cashier</th>
                                    <th className="border p-2 hover:bg-green-800 cursor-pointer" onClick={() => {sortInput(props.setIsSorted, transactionArray, props.isSorted)}}>Currency Input</th>
                                    <th className="border p-2 hover:bg-green-800 cursor-pointer" onClick={() => {sortRate(props.setIsSorted, transactionArray, props.isSorted)}}>Rate</th>
                                    <th className="border p-2 hover:bg-green-800 cursor-pointer" onClick={() => {sortOutput(props.setIsSorted, transactionArray, props.isSorted)}}>Currency Output</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactionArray.map((transaction, transactionKey)=>{
                                        return(
                                            <tr className="border hover:bg-blue-700" key={transactionKey}>
                                                <td className="border p-2">{transaction._id}</td>
                                                <td className="border p-2">{transaction.type}</td>
                                                <td className="border p-2">{transaction.date}</td>
                                                <td className="border p-2">{transaction.cashier}</td>
                                                <td className="border p-2">{transaction.currencyIn} {transaction.currencyInAmmount}</td>
                                                <td className="border p-2">{transaction.rate}</td>
                                                <td className="border p-2">{transaction.currencyOut} {transaction.currencyOutAmmount}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Transactions;