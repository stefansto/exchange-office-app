import React from "react";

const Exchange = (props) => {

    let newTransaction = {
        type: "Exchange",
        date: null,
        cashier: props.loggedInUser,
        currencyIn: null,
        currencyInAmmount: null,
        currencyOut: null,
        currencyOutAmmount: null,
        rate: null
    }

    let ammountText = 0;
    let rate = 0;
    let selectedOptionFrom = null;
    let selectedOptionTo = null;
    return(
        <>
            <div className="">
                <div className="w-full">
                    <label className="w-1/6" htmlFor="select_ex_out">From:</label>
                    <select 
                        onChange={(e)=>{
                            const index = e.target.selectedIndex;
                            selectedOptionFrom = e.target.childNodes[index];
                            ammountText = document.getElementById('ammountText').value = 0;
                        }} 
                        className='w-40 m-5 p-1 border rounded-md'
                        defaultValue={'defaultSelectValueFrom'}
                        id="select_ex_out"
                    >
                        <option className="block px-4 py-2 text-sm text-white bg-gray-900" id="0" hidden disabled value='defaultSelectValueFrom'>Choose:</option>
                        {
                            props.currencies.map(function(prop, index){
                                return <option className="block px-4 py-2 text-sm text-white bg-gray-900" key={index} id={prop.id}>{prop.name} </option>
                            })
                        }
                    </select>

                    <label className="w-1/6" htmlFor="select_ex_in">To:</label>
                    <select 
                        onChange={(e)=>{
                            const index = e.target.selectedIndex;
                            selectedOptionTo = e.target.childNodes[index];
                        }} 
                        className='w-40 m-5 p-1 border rounded-md'
                        defaultValue={'defaultSelectValueTo'}
                        id="select_ex_in"
                    >
                        <option className="block px-4 py-2 text-sm text-white bg-gray-900" hidden disabled value='defaultSelectValueTo'>Choose:</option>
                        {
                            props.currencies.map(function(prop, index){
                                return <option className="block px-4 py-2 text-sm text-white bg-gray-900" key={index} id={prop.id}>{prop.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="flex justify-around p-2">
                    <div>
                        <label htmlFor="ammountText">Ammount:</label>
                        <input className="border rounded-md p-1 w-30 m-2" type="text" placeholder='Ammount' id="ammountText" />
                    </div>
                    <div>
                        <label htmlFor="rate">Rate:</label>
                        <input className="border rounded-md p-1 w-30 m-2" type="text" placeholder="Rate" id="rate" />
                    </div>
                </div>
                    
                <button
                    className="border rounded-md p-1 hover:bg-blue-900 cursor-pointer" 
                    onClick={()=>{
                        let exchangeError = false;
                        let errorList = [];

                        if(/^\d*\.?\d*$/.exec(document.getElementById('rate').value) && document.getElementById('rate').value > 0){
                            rate = parseFloat(document.getElementById('rate').value);
                        } else {
                            exchangeError = true; 
                            errorList.push('Invalid Rate!');
                        }

                        if(/^\d*\.?\d*$/.exec(document.getElementById('ammountText').value) && document.getElementById('ammountText').value > 0){
                            ammountText = parseFloat(document.getElementById('ammountText').value);
                        } else {
                            exchangeError = true;
                            errorList.push('Invalid Ammount!')
                        }

                        if(selectedOptionTo===null || selectedOptionFrom===null){
                            errorList.push('Please select your currencies!');
                            exchangeError = true;
                        } else {
                            if(selectedOptionFrom.value == selectedOptionTo.value){
                                errorList.push('Please select different currencies!');
                                exchangeError = true;
                            } else {
                                newTransaction.currencyOut = selectedOptionFrom.value;
                                newTransaction.currencyIn = selectedOptionTo.value;
                            }
                        }

                        if(!exchangeError){
                            newTransaction.rate = rate;
                            let dateAndTime = new Date();
                            newTransaction.date = dateAndTime.getDate() +'/'+ (dateAndTime.getMonth()+1) +'/'+ dateAndTime.getFullYear() + '  ' + dateAndTime.getHours() + ':' + dateAndTime.getMinutes() + ':' + dateAndTime.getSeconds();
                            newTransaction.currencyInAmmount = (ammountText * rate);
                            newTransaction.currencyOutAmmount = ammountText;
                            fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/transactions/new`, {
                                method: 'PUT',
                                headers: {'Content-type': 'application/json'},
                                credentials: 'include',
                                body: JSON.stringify(newTransaction)
                            })
                            .then(response => response.json())
                            .then(data => {
                                if(data.errorMessage){
                                    alert(data.errorMessage);
                                } else if(data.expiredToken){
                                    alert('Token expired!');
                                    props.setLoggedInUser(null);
                                } else if(data.message){
                                    alert('Successfully added: ' + newTransaction.currencyInAmmount + ' ' + newTransaction.currencyIn);
                                    props.refreshData();
                                } else {
                                    throw Error;
                                }
                            })
                            .catch((e)=>{
                                alert('Server error, please try again later!');
                            })
                            .finally(()=>{
                                props.onClose();
                            })
                        } else {
                            let txt = '';
                            errorList.forEach((x)=>{txt+=x});
                            alert(errorList);
                        }
                    }}>
                    Exchange
                </button>
            </div>
        </>
    );
}

export default Exchange;