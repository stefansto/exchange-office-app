import React, { useState } from 'react';
import Header from './components/Header/Header.jsx';
import Currencies from './components/Currencies/Currencies.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './components/Login/Login.jsx';
import Input from './components/Input/Input.jsx';
import Output from './components/Output/Output.jsx';
import Exchange from './components/Exchange/Exchange.jsx';
import Modal from './components/Modal/Modal.jsx';
import Transactions from './components/Transactions/Transactions.jsx';

const API_URL = 'http://localhost:3000';

function App() {
  const [isLogged, setIsLogged] = useState(null);

  const [openExchange, setOpenExchange] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openOutput, setOpenOutput] = useState(false);

  const [money, setMoney] = useState(null);
  const [moneyLoading, setMoneyLoading] = useState(false);

  const [transactions, setTransactions] = useState(null);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const [isSorted, setIsSorted] = useState(null);

  const [error, setError] = useState(false);
  
  if(!isLogged) {
    return(<div className='pt-20 justify-center flex'><Login login={(x)=>setIsLogged(x)} API_URL={API_URL} /></div>);
  } else {
    if(!money && !moneyLoading){
      setMoneyLoading(true);
      fetch(`${API_URL}/currency`, {
        method: 'get',
        headers: {'Content-type': 'application/json'},
      })
        .then(response => response.json())
        .then(data => {
          setMoney(data.res.currencies);
        })
        .catch((e)=>{
          console.log('Error fetching data');
        })
        .finally(()=>{
          setMoneyLoading(false);
        })
    }
    if(!transactions && !transactionsLoading){
      setTransactionsLoading(true);
      fetch(`${API_URL}/transaction`, {
        method: 'get',
        headers: {'Content-type': 'application/json'},
      })
        .then(response => response.json())
        .then(data => {
          setTransactions(data.res.transactions);
        })
        .catch((e)=>{
          console.log('Error fetching data');
        })
        .finally(() => {
          setTransactionsLoading(false);
        })
    }
    return(
      <>
        <div className='border-b-1'>
          <Header 
            clickExch={()=>setOpenExchange(true)}
            clickInput={()=>setOpenImport(true)}
            clickOutput={()=>setOpenOutput(true)}
            clickLogout={()=>{setMoney(null); setTransactions(null); setIsLogged(null);}}
          />
        </div>

        {
          moneyLoading ? 
            <p>loading currencies</p> : 
            <div className='mt-10'>
              <Currencies curr={money} />
            </div>
        }
        {
          transactionsLoading ? 
            <p>loading transactions</p> : 
            <Transactions transactions={transactions} setTransactions={(x)=>{setTransactions(x)}} isSorted={isSorted} setIsSorted={(x)=>{setIsSorted(x)}} currencies={money} API_URL={API_URL}/>
        }

        <div className='fixed bottom-0 w-screen bg-slate-950'>
          <Footer info={isLogged} />
        </div>
        
        <Modal open={openExchange} onClose={()=>setOpenExchange(false)}>
          <Exchange curr={money} user={isLogged} refreshData={()=>{setMoney(null); setTransactions(null); setIsSorted(null)}} onClose={()=>setOpenExchange(false)} API_URL={API_URL} />
        </Modal>
        
        <Modal open={openImport} onClose={()=>setOpenImport(false)}>
          <Input curr={money} user={isLogged} refreshData={()=>{setMoney(null); setTransactions(null); setIsSorted(null)}} onClose={()=>setOpenImport(false)} API_URL={API_URL} />
        </Modal>
        
        <Modal open={openOutput} onClose={()=>setOpenOutput(false)}>
          <Output curr={money} user={isLogged} refreshData={()=>{setMoney(null); setTransactions(null); setIsSorted(null)}} onClose={()=>setOpenOutput(false)} API_URL={API_URL} />
        </Modal>
      </>
    );
  }
}

export default App
