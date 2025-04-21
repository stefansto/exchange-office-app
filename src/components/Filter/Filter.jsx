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
            setSort(null);
            setFilter(data.res.transactions);
        })
        .catch((e)=>{
            console.log('Error fetching data');
        })
        .finally(()=>{
            console.log('final');
        })
}

const Filter = ({currencies, setTransactions, setIsSorted, API_URL}) => {
    return(
        <>
            <div>
                <form>
                    {
                        currencies.map((currency, currencyKey)=>{
                            return(<div key={currencyKey}><input type="checkbox" value={currency.name} name="filter" id={currency.name}/><label htmlFor={currency.name}>{currency.name}</label></div>)
                        })
                    }
                    <input 
                        type="button" 
                        value="Apply" 
                        onClick={() => {
                            const elements = document.getElementsByName("filter");
                            let checkedElemenets = [];
                            elements.forEach(element => {
                                if(element.checked){
                                    checkedElemenets.push(element.value);
                                }
                            });
                            handleFilterSubmit(checkedElemenets, setTransactions, setIsSorted, API_URL);
                        } 
                    }/>
                    <input 
                        type="button"
                        value="Reset"
                        onClick={()=>{
                            setTransactions(null);
                            setIsSorted(null);
                        }}
                    />
                </form>
            </div>
        </>
    );
}

export default Filter;