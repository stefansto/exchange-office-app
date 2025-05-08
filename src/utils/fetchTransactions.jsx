const fetchTransactions = (transactions, transactionsLoading, setTransactions, setTransactionsLoading, setIsLogged) => {
    if(!transactions && !transactionsLoading){
        setTransactionsLoading(true);
        fetch(`${import.meta.env.VITE_EXCHANGE_APP_API_URL}/transactions`, {
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
            } else if(data.res.transactions){
                setTransactions(data.res.transactions);
            } else {
                throw Error;
            }
        })
        .catch((e)=>{
            alert('Error fetching transactions!');
        })
        .finally(() => {
            setTransactionsLoading(false);
        })
    }
}

export default fetchTransactions;