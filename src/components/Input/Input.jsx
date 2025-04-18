import React from "react";

const Input = (props) => {

    let newTransaction = {
        type: "Input",
        date: null,
        cashier: props.user,
        currencyIn: null,
        currencyInAmmount: null,
        currencyOut: null,
        currencyOutAmmount: null,
        rate: null
    }

    let option = 0;
    let inputText = 0;

    return(
        <>
            <div className="w-full h-full">
                <select 
                    className='w-50 m-5 p-1 border rounded-md'
                    defaultValue={'selected'}
                    onChange={(e)=>{
                        const index = e.target.selectedIndex;
                        const el = e.target.childNodes[index];
                        option = el.getAttribute('id');
                        inputText = document.getElementById('inputText').value = 0;
                        newTransaction.currencyIn = el.value;
                    }}
                >
                    <option hidden disabled value='selected'>Choose:</option>
                        {
                            props.curr.map((prop, index) => {
                                return <option className='block px-4 py-2 text-sm text-white bg-gray-900' key={index} id={prop.id}>{prop.name}</option>
                            })
                        }
                </select>
                    
                <input type="text" placeholder="Ammount" id="inputText" 
                    onClick={()=>{
                        document.getElementById('inputText').select();
                    }}
                    className="border rounded-md p-1"/>

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
                                fetch(`${props.API_URL}/transaction`, {
                                    method: 'put',
                                    headers: {'Content-type': 'application/json'},
                                    body: JSON.stringify(newTransaction)
                                })
                                .then(response => response.json())
                                .then(data => {
                                    if(data.message === 'Error'){
                                        alert('Database error');
                                    }
                                    props.refreshData();
                                })
                                .catch((e)=>{
                                    alert('Server error, please try again later!');
                                })
                                .finally(()=>{
                                    props.onClose();
                                })
                            }
                            else{
                                errorInput = true;
                                errorList.push('Can\'t input a zero! ');
                            }
                        }
                        else{
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