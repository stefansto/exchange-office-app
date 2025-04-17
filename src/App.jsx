import React, { useState } from 'react';
import Header from './components/Header/Header.jsx';
import Currencies from './components/Currencies/Currencies.jsx';
import {curr} from './data/curr.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './components/Login/Login.jsx';
import Input from './components/Input/Input.jsx';
import Output from './components/Output/Output.jsx';
import Exchange from './components/Exchange/Exchange.jsx';
import Modal from './components/Modal/Modal.jsx';
import Transactions from './components/Transactions/Transactions.jsx';

var pare = curr;

function App() {
  const [isLogged, setIsLogged] = useState(null);

  const [openExchange, setOpenExchange] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openOutput, setOpenOutput] = useState(false);

  const [money, setMoney] = useState(pare);

  const [transactions, setTransactions] = useState([]);
  
  if(!isLogged) return(<div className='pt-20 justify-center flex'><Login login={(x)=>setIsLogged(x)}/></div>)
    else return (
    <>
      <div className='border-b-1'>
        <Header 
          clickExch={()=>setOpenExchange(true)}
          clickInput={()=>setOpenImport(true)}
          clickOutput={()=>setOpenOutput(true)}
          clickLogout={()=>setIsLogged(null)}
          />
      </div>

      <div className='mt-10'>
        <Currencies curr={money} />
      </div>

      <div className='min-h-100'>
        <div className='flex justify-around mt-10 '>
          <Transactions transactions={transactions} />
        </div>
      </div>
      
      <div className='fixed bottom-0 w-screen bg-slate-950'>
        <Footer info={isLogged} />
      </div>
      
      <Modal open={openExchange} onClose={()=>setOpenExchange(false)}>
        <Exchange curr={money} user={isLogged} setMoney={(x)=>setMoney(x)} onClose={()=>setOpenExchange(false)} setTransactions={(x)=>setTransactions(transactions.concat(x))} />
      </Modal>
      
      <Modal open={openImport} onClose={()=>setOpenImport(false)}>
        <Input curr={money} user={isLogged} setMoney={(x)=>setMoney(x)} onClose={()=>setOpenImport(false)} setTransactions={(x)=>{setTransactions([...transactions, x])}} /> 
      </Modal>
      
      <Modal open={openOutput} onClose={()=>setOpenOutput(false)}>
        <Output curr={money} user={isLogged} setMoney={(x)=>setMoney(x)} onClose={()=>setOpenOutput(false)} setTransactions={(x)=>setTransactions(transactions.concat(x))} />
      </Modal>
    </>
  )
}

export default App
