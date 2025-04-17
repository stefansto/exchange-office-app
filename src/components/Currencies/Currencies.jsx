import React from 'react';
import Currency from '../Currency/Currency.jsx';


const Currencies = (props) => {
    
    const currencyArray = props.curr.map((valuta,index) => {
        return <Currency key={props.curr[index].id} name={valuta.name} img={valuta.img} ammount={valuta.ammount} />
    })
    
    return(
        <div className='flex justify-around'>
           {currencyArray}
        </div>
    );
}

export default Currencies;