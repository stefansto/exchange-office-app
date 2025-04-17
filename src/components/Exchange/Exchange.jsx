import React from "react";

const Exchange = (props) => {

    let newTransaction = {
        id: 1,
        type: "Exchange",
        currIn: null,
        ammountIn: 0,
        currOut: null,
        ammountOut: 0,
        rate: 1,
        date: null,
        cashier: props.user
    }

    let optionA = 0;
    let optionB = 0;

    let ammountText = 0;
    let rate = 0;
    let elA = null;
    let elB = null;
    return(
        <>
            <div className="">
                <div className="w-full">
                    <label className="w-1/6">From:</label>
                    <select 
                        onChange={(e)=>{
                            const index = e.target.selectedIndex;
                            elA = e.target.childNodes[index];
                            optionA = elA.getAttribute('id');
                            ammountText = document.getElementById('ammountText').value = 0;
                        }} 
                        className='w-40 m-5 p-1 border rounded-md' defaultValue={'selectedA'}>
                            <option className="block px-4 py-2 text-sm text-white bg-gray-900" id="0" hidden disabled value='selectedA'>Choose:</option>
                        {
                            props.curr.map(function(prop, index){
                                return <option className="block px-4 py-2 text-sm text-white bg-gray-900" key={index} id={prop.id}>{prop.name} </option>
                            })
                        }
                    </select>

                    <label className="w-1/6">To:</label>
                    <select 
                        onChange={(e)=>{
                            const index = e.target.selectedIndex;
                            elB = e.target.childNodes[index];
                            optionB = elB.getAttribute('id');
                        }} 
                        className='w-40 m-5 p-1 border rounded-md'
                        defaultValue={'selectedB'}
                    >
                        <option className="block px-4 py-2 text-sm text-white bg-gray-900" hidden disabled value='selectedB'>Choose:</option>
                        {
                            props.curr.map(function(prop, index){
                                return <option className="block px-4 py-2 text-sm text-white bg-gray-900" key={index} id={prop.id}>{prop.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="flex justify-around p-2">
                    <div>
                        <label className="">Ammount:</label>
                        <input className="border rounded-md p-1 w-30 m-2" type="text" placeholder='Ammount' id="ammountText" />
                    </div>
                    <div>
                        <label className="">Rate:</label>
                        <input className="border rounded-md p-1 w-30 m-2" type="text" placeholder="Rate" id="rate" />
                    </div>
                </div>
                    
                    <button className="border rounded-md p-1 hover:bg-blue-900 cursor-pointer" 
                            onClick={()=>{
                                let newMoney = null;
                                let exchangeError = false;
                                let errorList = [];

                                if(/^\d*\.?\d*$/.exec(document.getElementById('rate').value) && document.getElementById('rate').value > 0){
                                    rate = parseFloat(document.getElementById('rate').value);
                                }
                                else{
                                    exchangeError = true; 
                                    errorList.push('Invalid Rate!');
                                }

                                if(/^\d*\.?\d*$/.exec(document.getElementById('ammountText').value) && document.getElementById('ammountText').value > 0){
                                    ammountText = parseFloat(document.getElementById('ammountText').value);
                                }
                                else{
                                    exchangeError = true;
                                    errorList.push('Invalid Ammount!')
                                }
                                
                                if(elB===null || elA===null){
                                    errorList.push('Please select your currencies!');
                                    exchangeError = true;
                                }
                                else{
                                    if(elA.value == elB.value){
                                        errorList.push('Please select different currencies!');
                                        exchangeError = true;
                                    }
                                    else{
                                        newTransaction.currOut = elA.value;
                                        newTransaction.currIn = elB.value;
                                    }
                                }

                                if(exchangeError)console.log(errorList)
                                else {
                                    newMoney = props.curr.map(x => {
                                        if(x.id == optionA){
                                            if(x.ammount < ammountText){
                                                errorList.push('Not enought funds in register');
                                                exchangeError=true;
                                            }
                                            newTransaction.ammountOut = ammountText;
                                            return {...x, ammount: x.ammount - ammountText }
                                        }else if(x.id == optionB){
                                            newTransaction.ammountIn = ammountText * rate;
                                            return {...x, ammount: x.ammount + ammountText * rate}
                                        }else{
                                            return {...x};
                                        }
                                    })
                                }
                                
                        if(!exchangeError){
                            newTransaction.id = crypto.randomUUID();
                            newTransaction.rate = rate;
                            let dateAndTime = new Date();
                            newTransaction.date = dateAndTime.getDate() +'/'+ (dateAndTime.getMonth()+1) +'/'+ dateAndTime.getFullYear() + '  ' + dateAndTime.getHours() + ':' + dateAndTime.getMinutes() + ':' + dateAndTime.getSeconds();
    
                            props.setMoney(newMoney);
                            props.setTransactions(newTransaction);
                            props.onClose();
                            alert('Successfully added: ' + newTransaction.ammountIn + ' ' + newTransaction.currIn);
                        }
                        else{
                            let txt = '';
                            errorList.forEach((x)=>{txt+=x});
                            alert(errorList);
                        }
                        
                    }}>Exchange</button>
                
            </div>
        </>
    );
}

export default Exchange;