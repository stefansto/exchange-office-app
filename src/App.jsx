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
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';


function App() {
  const [isLogged, setIsLogged] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [adminPanel, setAdminPanel] = useState(false);

  const [openExchange, setOpenExchange] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openOutput, setOpenOutput] = useState(false);

  const [money, setMoney] = useState(null);
  const [moneyLoading, setMoneyLoading] = useState(false);

  const [transactions, setTransactions] = useState(null);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const [isSorted, setIsSorted] = useState(null);

  const [error, setError] = useState(false);

  const [users, setUsers] = useState(null);
  const [changeUserForm, setChangeUserForm] = useState(null);

  if(!isLogged) {
    return(
      <div className='pt-20 justify-center flex'>
        <Login 
          setLogin={(x)=>setIsLogged(x)}
          setRole={(x)=>setUserRole(x)}
        />
      </div>
    );
  } else if(adminPanel === true){
    return (
      <>
        <AdminPanel
          closeAdminPanel={()=>{setAdminPanel(false); setUsers(null)}}
          userRole={userRole}
          users={users}
          setUsers={(x)=>{setUsers(x)}}
          changeUserForm={changeUserForm}
          setChangeUserForm={(x)=>setChangeUserForm(x)}
        />
      </>
    );
  } else if(isLogged){
    if(!money && !moneyLoading){
      setMoneyLoading(true);
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
            setMoney(data.res.currencies);
          } else {
            throw Error;
          }
        })
        .catch((e)=>{
          console.log('Error fetching currencies!');
        })
        .finally(()=>{
          setMoneyLoading(false);
        })
    }
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
    return(
      <>
        <div className='border-b-1'>
          <Header 
            clickExch={()=>setOpenExchange(true)}
            clickInput={()=>setOpenImport(true)}
            clickOutput={()=>setOpenOutput(true)}
            clickLogout={()=>{
              setMoney(null);
              setTransactions(null);
              setIsLogged(null);
              setUserRole(null);
            }}
            userRole={userRole}
            openAdminPanel={()=>{setAdminPanel(true)}}
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
            <Transactions 
              transactions={transactions} 
              setTransactions={(x)=>{setTransactions(x)}} 
              isSorted={isSorted} 
              setIsSorted={(x)=>{setIsSorted(x)}} 
              currencies={money} 
              setIsLogged={(x)=>setIsLogged(x)} 
            />
        }

        <div className='fixed bottom-0 w-screen bg-slate-950'>
          <Footer info={isLogged} />
        </div>
        
        <Modal open={openExchange} onClose={()=>setOpenExchange(false)}>
          <Exchange 
            curr={money} 
            user={isLogged} 
            refreshData={()=>{setMoney(null); setTransactions(null); setIsSorted(null)}} 
            onClose={()=>setOpenExchange(false)} 
            setIsLogged={(x)=>setIsLogged(x)} 
          />
        </Modal>
        
        <Modal open={openImport} onClose={()=>setOpenImport(false)}>
          <Input 
            curr={money} 
            user={isLogged} 
            refreshData={()=>{setMoney(null); setTransactions(null); setIsSorted(null)}} 
            onClose={()=>setOpenImport(false)} 
            setIsLogged={(x)=>setIsLogged(x)} 
          />
        </Modal>
        
        <Modal open={openOutput} onClose={()=>setOpenOutput(false)}>
          <Output 
            curr={money} 
            user={isLogged} 
            refreshData={()=>{setMoney(null); setTransactions(null); setIsSorted(null)}} 
            onClose={()=>setOpenOutput(false)} 
            setIsLogged={(x)=>setIsLogged(x)} 
          />
        </Modal>
      </>
    );
  }
}

export default App;