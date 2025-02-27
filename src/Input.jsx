import React from "react";

const Input = (props) => {

    let newTransaction = {
        id: null,
        type: "Input",
        currIn: null,
        ammountIn: null,
        currOut: null,
        ammountOut: 0,
        rate: '/',
        date: null,
        cashier: props.user
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
                        newTransaction.currIn = el.value;
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

                            if(/^\d*\.?\d*$/.exec(document.getElementById('inputText').value) && newTransaction.currIn){
                                inputText = parseFloat(document.getElementById('inputText').value);
                                if(inputText > 0){
                                    newTransaction.ammountIn = inputText;
                                    const newMoney = props.curr.map(x => {
                                        if(x.id == option){
                                            return {...x, ammount: x.ammount + inputText}
                                        }else {
                                            return {...x}
                                        }
                                    })
            
                                    let dateAndTime = new Date();
                                    newTransaction.date = dateAndTime.getDate() +'/'+ (dateAndTime.getMonth()+1) +'/'+ dateAndTime.getFullYear() + '  ' + dateAndTime.getHours() + ':' + dateAndTime.getMinutes() + ':' + dateAndTime.getSeconds();
                                    newTransaction.id = crypto.randomUUID();
                                    props.setMoney(newMoney);
                                    props.setTransactions(newTransaction);
                                    props.onClose();
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
                    className="m-5 border rounded-md w-20 h-10 hover:bg-green-900 cursor-pointer">Input</button>
                
            </div>
        </>
    );
}

export default Input;