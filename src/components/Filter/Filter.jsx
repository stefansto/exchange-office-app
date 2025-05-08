import React from "react";
import handleFilterSubmit from "../../utils/handleFilterSubmit";

const Filter = ({currencies, setTransactions, setIsSorted, setLoggedInUser}) => {
    return(
        <>
            <div className="m-5 flex justify-around">
                <form className="w-250">
                    <div className='flex justify-around'>
                        <div className="items-center w-50 p-2 border text-center rounded-lg">
                            <p>Currency In</p>
                            {
                                currencies ?
                                    currencies.map((currency, currencyKey)=>{
                                        return(<div key={currencyKey}><input type="checkbox" value={currency.name} name="currencyIn" id={'currencyIn_'+currency.name}/><label htmlFor={'currencyIn_'+currency.name}>{currency.name}</label></div>)
                                    }) : <p>Error loading currencies!</p>
                            }
                        </div>
                        <div className="items-center w-50 p-2 border text-center rounded-lg">
                            <p>Currency Out</p>
                            {   currencies ?
                                    currencies.map((currency, currencyKey)=>{
                                        return(<div key={currencyKey}><input type="checkbox" value={currency.name} name="currencyOut" id={'currencyOut_'+currency.name}/><label htmlFor={'currencyOut_'+currency.name}>{currency.name}</label></div>)
                                    }) : <p>Error loading currencies!</p>
                            }
                        </div>

                        <div className="items-center w-50 p-2 border text-center rounded-lg">
                            <p>Transaction Type</p>
                            <div><input type="checkbox" value="Exchange" name="type" id="type_ex"/><label htmlFor="type_ex">Exchange</label></div>
                            <div><input type="checkbox" value="Input" name="type" id="type_in"/><label htmlFor="type_in">Input</label></div>
                            <div><input type="checkbox" value="Output" name="type" id="type_out"/><label htmlFor="type_out">Output</label></div>
                        </div>

                    </div>
                    <div className="flex justify-around">
                        <div className="flex justify-around w-100">
                            <input 
                                type="button" 
                                value="Apply"
                                className='m-5 border rounded-md w-20 h-10 hover:bg-green-900 cursor-pointer'
                                onClick={() => {
                                    let request = {};
                                    let elements = document.getElementsByName("currencyIn");
                                    let checkedElemenets = [];
                                    elements.forEach(element => {
                                        if(element.checked){
                                            checkedElemenets.push(element.value);
                                        }
                                    });
                                    if(checkedElemenets.length)request.currencyIn = checkedElemenets;

                                    elements = document.getElementsByName("currencyOut");
                                    checkedElemenets = [];
                                    elements.forEach(element => {
                                        if(element.checked){
                                            checkedElemenets.push(element.value);
                                        }
                                    });
                                    if(checkedElemenets.length)request.currencyOut = checkedElemenets;

                                    elements = document.getElementsByName("type");
                                    checkedElemenets = [];
                                    elements.forEach(element => {
                                        if(element.checked){
                                            checkedElemenets.push(element.value);
                                        }
                                    });
                                    
                                    if(checkedElemenets.length)request.type = checkedElemenets;

                                    if(Object.keys(request).length){
                                        handleFilterSubmit(request, setTransactions, setIsSorted, setLoggedInUser);
                                    } else {
                                        alert('Unspecified filter parametars')
                                    }
                                }
                            }/>
                            <input 
                                type="button"
                                value="Reset"
                                className='m-5 border rounded-md w-20 h-10 hover:bg-red-900 cursor-pointer'
                                onClick={()=>{
                                    setTransactions(null);
                                    setIsSorted(null);
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Filter;