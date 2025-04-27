import React from 'react';

const Output = (props) => {

    let newTransaction = {
        type: "Output",
        date: null,
        cashier: props.user,
        currencyIn: null,
        currencyInAmmount: null,
        currencyOut: null,
        currencyOutAmmount: null,
        rate: null
    }
    let selectedOption = null;
    let outputText = 0;

    return (
        <>
            <div className='output'>
                <select
                    className='w-50 m-5 p-1 border rounded-md'
                    defaultValue='selected'
                    onChange={(e)=>{
                        const index = e.target.selectedIndex;
                        selectedOption = e.target.childNodes[index];
                        outputText = document.getElementById('outputText').value = 0;
                    }}
                >
                    <option hidden disabled value='selected'>Choose:</option>
                    {
                        props.curr.map((prop, index)=>{
                            return <option className='block px-4 py-2 text-sm text-white bg-gray-900' key={index} id={prop.id}>{prop.name}</option>
                        })
                    }
                </select>

                <input required type='text' placeholder='Ammount' id='outputText'
                    onClick={()=>{
                        document.getElementById('outputText').select();
                    }} 
                    className="border rounded-md p-1" />

                <button 
                    onClick={()=>{
                        let outputError = false;
                        let errorList = [];

                        if(selectedOption === null){
                            outputError = true;
                            errorList.push('Choose your currency! ');
                        }
                        else{
                            newTransaction.currencyOut = selectedOption.value;
                        }
                        
                        if(/^\d*\.?\d*$/.exec(document.getElementById('outputText').value) && newTransaction.currencyOut){
                            outputText = parseFloat(document.getElementById('outputText').value);
                            if(outputText > 0){
                                newTransaction.currencyOutAmmount = outputText;
                            }
                            else{
                                outputError = true; 
                                errorList.push('Ammount can\'t be a zero! ');
                            }
                        }
                        else{
                            outputError = true; 
                            errorList.push('Invalid ammount! ');
                        }

                        if(outputError){
                            let txt = '';
                            errorList.forEach((x)=>{txt += x});
                            alert(errorList);
                        }
                        else{
                            let dateAndTime = new Date();
                            newTransaction.date = dateAndTime.getDate() +'/'+ (dateAndTime.getMonth()+1) +'/'+ dateAndTime.getFullYear() + '  ' + dateAndTime.getHours() + ':' + dateAndTime.getMinutes() + ':' + dateAndTime.getSeconds();
                            fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/transaction`, {
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
                    }}
                    className='m-5 border rounded-md w-20 h-10 hover:bg-red-900 cursor-pointer'>
                    Output
                </button>
            </div>
        </>
    );
}

export default Output;