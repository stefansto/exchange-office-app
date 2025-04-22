import React from "react";

const handleFilterSubmit = ( checkedArray , setFilter, setSort, API_URL) => {
    fetch(`${API_URL}/filter`, {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            checked: checkedArray
        })
    })
    .then(response => response.json())
    .then(data => {
        setFilter(data.res.transactions);
    })
    .catch((e)=>{
        console.log('Error fetching data');
    })
    .finally(()=>{
        setSort(null);
    })
}

const Filter = ({currencies, setTransactions, setIsSorted, API_URL}) => {
    return(
        <>
            <div className="m-5 flex justify-around">
                <form className="w-250">
                    <div className='flex justify-around'>
                        <div className="items-center w-50 p-2 border text-center rounded-lg">
                            <p>Currency In</p>
                            {
                                currencies.map((currency, currencyKey)=>{
                                    return(<div key={currencyKey}><input type="checkbox" value={currency.name} name="currencyIn" /><label htmlFor="currencyIn">{currency.name}</label></div>)
                                })
                            }
                        </div>
                        <div className="items-center w-50 p-2 border text-center rounded-lg">
                            <p>Currency Out</p>
                            {
                                currencies.map((currency, currencyKey)=>{
                                    return(<div key={currencyKey}><input type="checkbox" value={currency.name} name="currencyOut" /><label htmlFor="currencyOut">{currency.name}</label></div>)
                                })
                            }
                        </div>

                        <div className="items-center w-50 p-2 border text-center rounded-lg">
                            <p>Transaction Type</p>
                            <div><input type="checkbox" value="Exchange" name="type" /><label htmlFor="type">Exchange</label></div>
                            <div><input type="checkbox" value="Input" name="type" /><label htmlFor="type">Input</label></div>
                            <div><input type="checkbox" value="Output" name="type" /><label htmlFor="type">Output</label></div>
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
                                        handleFilterSubmit(request, setTransactions, setIsSorted, API_URL);
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