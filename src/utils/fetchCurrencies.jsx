const fetchCurrencies = (currencies, currenciesLoading, setCurrencies, setCurrenciesLoading, setIsLogged) => {
    if(!currencies && !currenciesLoading){
        setCurrenciesLoading(true);
        fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/currencies`, {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if(data.expiredToken){
                setIsLogged(null);
            } else if(data.errorMessage){
                alert(data.errorMessage);
                setIsLogged(null);
            } else if(data.res.currencies){
                setCurrencies(data.res.currencies);
            } else {
                throw Error;
            }
        })
        .catch((e)=>{
            console.log('Error fetching currencies!');
        })
        .finally(()=>{
            setCurrenciesLoading(false);
        })
    }
}

export default fetchCurrencies;