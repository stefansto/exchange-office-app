import React, { useState } from 'react';
import Login from './components/Login/Login.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import Home from './components/Home/Home.jsx';

import fetchTransactions from './utils/fetchTransactions.jsx';
import fetchCurrencies from './utils/fetchCurrencies.jsx';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [adminPanel, setAdminPanel] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [currencies, setCurrencies] = useState(null);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);

  const [transactions, setTransactions] = useState(null);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState(null);

  const [users, setUsers] = useState(null);
  const [changeUserForm, setChangeUserForm] = useState(null);

  if(!loggedInUser) {
    return(
      <Login 
        setLoggedInUser={setLoggedInUser}
        setUserRole={setUserRole}
      />
    );
  }
  else if(adminPanel === true){
    return(
      <AdminPanel
        closeAdminPanel={()=>{
          setAdminPanel(false);
          setUsers(null);
        }}
        users={users}
        setUsers={setUsers}
        changeUserForm={changeUserForm}
        setChangeUserForm={setChangeUserForm}
      />
    );
  }
  else if(loggedInUser){
    fetchCurrencies(currencies, currenciesLoading, setCurrencies, setCurrenciesLoading, setLoggedInUser);
    fetchTransactions(transactions, transactionsLoading, setTransactions, setTransactionsLoading, setLoggedInUser);
    return(
      <Home
        openModal = {openModal}
        setOpenModal = {setOpenModal}

        currencies = {currencies}
        setCurrencies = {setCurrencies}
        currenciesLoading = {currenciesLoading}

        transactions = {transactions}
        setTransactions = {setTransactions}
        transactionsLoading = {transactionsLoading}

        loggedInUser = {loggedInUser}
        setLoggedInUser = {setLoggedInUser}

        userRole = {userRole}
        setUserRole = {setUserRole}

        isSorted = {isSorted}
        setIsSorted = {setIsSorted}

        setAdminPanel = {setAdminPanel}
      />
    );
  }
}

export default App;