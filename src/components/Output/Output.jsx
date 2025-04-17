import React from 'react';

const Output = (props) => {

    let newTransaction = {
        id: 1,
        type: "Output",
        currIn: null,
        ammountIn: 0,
        currOut: null,
        ammountOut: null,
        rate: '/',
        date: null,
        cashier: props.user
    }

    let el = null;

    let option = 0;
    let outputText = 0;

    return (
        <>
            <div className='output'>
                
                    <select
                        className='w-50 m-5 p-1 border rounded-md'
                        defaultValue='selected'
                        onChange={(e)=>{
                            const index = e.target.selectedIndex;
                            el = e.target.childNodes[index];
                            option = el.getAttribute('id');
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

                    <button onClick={()=>{
                        let newMoney = null;
                        let outputError = false;
                        let errorList = [];

                        if(el === null){
                            outputError = true;
                            errorList.push('Choose your currency! ');
                        }
                        else{
                            newTransaction.currOut = el.value;
                        }
                        
                        if(/^\d*\.?\d*$/.exec(document.getElementById('outputText').value) && newTransaction.currOut){
                            outputText = parseFloat(document.getElementById('outputText').value);
                            if(outputText > 0){
                                newTransaction.ammountOut = outputText;
                                newMoney = props.curr.map(x => {
                                    if(x.id == option){
                                        if(x.ammount < outputText || x.ammount === 0 || outputText === 0){
                                            outputError = true;
                                            errorList.push('Not enought money in register! ');
                                        }
                                        return {...x, ammount: x.ammount - outputText}
                                    }
                                    else{
                                        return {...x}
                                    }
                                })
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
                            newTransaction.id = crypto.randomUUID();
                            let dateAndTime = new Date();
                            newTransaction.date = dateAndTime.getDate() +'/'+ (dateAndTime.getMonth()+1) +'/'+ dateAndTime.getFullYear() + '  ' + dateAndTime.getHours() + ':' + dateAndTime.getMinutes() + ':' + dateAndTime.getSeconds();
                            props.setMoney(newMoney);
                            props.setTransactions(newTransaction);
                            props.onClose();
                        }
                    }} className='m-5 border rounded-md w-20 h-10 hover:bg-red-900 cursor-pointer'>Output</button>
                
            </div>
        </>
    );
}

export default Output;