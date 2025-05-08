import React from "react";
import Header from "../Header/Header";
import Currencies from "../Currencies/Currencies";
import Transactions from "../Transactions/Transactions";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import Exchange from "../Exchange/Exchange";
import Input from "../Input/Input";
import Output from "../Output/Output";

const Home = ({openModal, setOpenModal, currencies, currenciesLoading, transactions, transactionsLoading, setCurrencies, setTransactions, loggedInUser, setLoggedInUser, userRole, setUserRole, isSorted, setIsSorted, setAdminPanel}) => {
    return(
        <>
            <div className='border-b-1'>
                <Header 
                    clickExch={()=>setOpenModal('exchange')}
                    clickInput={()=>setOpenModal('input')}
                    clickOutput={()=>setOpenModal('output')}
                    clickLogout={()=>{
                        setCurrencies(null);
                        setTransactions(null);
                        setLoggedInUser(null);
                        setUserRole(null);
                    }}
                    userRole={userRole}
                    openAdminPanel={()=>{setAdminPanel(true)}}
                />
            </div>

            {
                currenciesLoading ? 
                    <p>loading currencies</p> : 
                        <div className='mt-10'>
                            <Currencies currencies={currencies} />
                        </div>
            }
            {
                transactionsLoading ? 
                    <p>loading transactions</p> : 
                        <Transactions 
                            transactions={transactions} 
                            setTransactions={setTransactions}
                            isSorted={isSorted} 
                            setIsSorted={setIsSorted}
                            currencies={currencies} 
                            setLoggedInUser={setLoggedInUser}
                        />
            }

            <Footer loggedInUser={loggedInUser} />
            
            <Modal openModal={openModal} onClose={()=>setOpenModal(false)}>
                {
                    openModal === 'exchange' ? 
                        <Exchange
                            currencies={currencies}
                            loggedInUser={loggedInUser}
                            refreshData={()=>{setCurrencies(null); setTransactions(null); setIsSorted(null)}}
                            onClose={()=>setOpenModal(false)}
                            setLoggedInUser={setLoggedInUser}
                        /> : 
                        openModal === 'input' ? 
                            <Input
                                currencies={currencies}
                                loggedInUser={loggedInUser}
                                refreshData={()=>{setCurrencies(null); setTransactions(null); setIsSorted(null)}}
                                onClose={()=>setOpenModal(false)}
                                setLoggedInUser={setLoggedInUser}
                            /> : 
                            openModal === 'output' ? 
                                <Output
                                    currencies={currencies}
                                    loggedInUser={loggedInUser}
                                    refreshData={()=>{setCurrencies(null); setTransactions(null); setIsSorted(null)}}
                                    onClose={()=>setOpenModal(false)}
                                    setLoggedInUser={setLoggedInUser}
                                /> : <p>Error</p>
                }
            </Modal>
        </>
    );
}

export default Home;