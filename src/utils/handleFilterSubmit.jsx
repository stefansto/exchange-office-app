const handleFilterSubmit = ( checkedArray , setFilter, setSort, setLoggedInUser ) => {
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
            setLoggedInUser(null);
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

export default handleFilterSubmit;