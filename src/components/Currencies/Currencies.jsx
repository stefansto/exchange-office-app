import React from 'react';
import Currency from '../Currency/Currency.jsx';

const Currencies = ( {currencies} ) => {
    let currencyArray = null;
    if(currencies){
        currencyArray = currencies.map((valuta,index) => {
            return <Currency key={currencies[index]._id} name={valuta.name} img={valuta.img} ammount={valuta.ammount} />
        });
    }
    return(
        <div className='flex justify-around'>
           {currencyArray}
        </div>
    );
}

export default Currencies;