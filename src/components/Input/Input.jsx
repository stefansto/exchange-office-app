import React from "react";

const Input = (props) => {

    let newTransaction = {
        type: "Input",
        date: null,
        cashier: props.loggedInUser,
        currencyIn: null,
        currencyInAmmount: null,
        currencyOut: null,
        currencyOutAmmount: null,
        rate: null
    }

    let inputText = 0;

    return(
        <>
            <div className="w-full h-full">
                <select 
                    id="select_input"
                    className='w-50 m-5 p-1 border rounded-md'
                    defaultValue={'selected'}
                    onChange={(e)=>{
                        const index = e.target.selectedIndex;
                        const el = e.target.childNodes[index];
                        inputText = document.getElementById('inputText').value = 0;
                        newTransaction.currencyIn = el.value;
                    }}
                >
                    <option hidden disabled value='selected'>Choose:</option>
                        {
                            props.currencies.map((prop, index) => {
                                return <option className='block px-4 py-2 text-sm text-white bg-gray-900' key={index} id={prop.id}>{prop.name}</option>
                            })
                        }
                </select>
                    
                <input
                    type="text" 
                    placeholder="Ammount" 
                    id="inputText"
                    className="border rounded-md p-1"
                    onClick={()=>{
                        document.getElementById('inputText').select();
                    }}
                />

                <button
                    onClick={()=>{
                        let errorInput = false;
                        let errorList = [];

                        if(/^\d*\.?\d*$/.exec(document.getElementById('inputText').value) && newTransaction.currencyIn){
                            inputText = parseFloat(document.getElementById('inputText').value);
                            if(inputText > 0){
                                newTransaction.currencyInAmmount = inputText;
                                let dateAndTime = new Date();
                                newTransaction.date = dateAndTime.getDate() +'/'+ (dateAndTime.getMonth()+1) +'/'+ dateAndTime.getFullYear() + '  ' + dateAndTime.getHours() + ':' + dateAndTime.getMinutes() + ':' + dateAndTime.getSeconds();
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
                                    } else if(data.expiredToken && data.expiredToken === true){
                                        alert('Token expired');
                                        props.setLoggedInUser(null);
                                    } else if(data.message){
                                        alert(data.message);
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
                                errorInput = true;
                                errorList.push('Can\'t input a zero! ');
                            }
                        } else {
                            errorInput = true;
                            errorList.push('Invalid input! ');
                        }
                        
                        if(errorInput){
                            let txt = '';
                            errorList.forEach((x)=>{
                                txt += x;
                            });
                            alert(txt);
                        }
                    }} 
                    className="m-5 border rounded-md w-20 h-10 hover:bg-green-900 cursor-pointer">
                    Input
                </button>
            </div>
        </>
    );
}

export default Input;