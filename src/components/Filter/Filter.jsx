import React from "react";

const handleFilterSubmit = ( checkedArray , setFilter, setSort, setIsLogged ) => {
    fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/transactions/filtered`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            checked: checkedArray
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.errorMessage){
            alert(data.errorMessage);
        } else if(data.expiredToken && data.expiredToken === true){
            alert('Token expired');
            setIsLogged(null);
        } else if(data.res.transactions){
            setFilter(data.res.transactions);
        }
    })
    .catch((e)=>{
        alert('Error fetching data');
    })
    .finally(()=>{
        setSort(null);
    })
}

const Filter = ({currencies, setTransactions, setIsSorted, setIsLogged}) => {
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
                                        handleFilterSubmit(request, setTransactions, setIsSorted, setIsLogged);
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