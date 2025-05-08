export const sortOutput = (setSort, array, type) => {
    let localType = 1;
    if(type != null){
        if(type.sortValue === 'currencyOut'){
            localType = -type.sortType;
        }
    }
    setSort(
        {
            sortedTransaction: array.toSorted((a,b)=>{
                if(b.currencyOut === null){
                    if(a.currencyOut === null) return 0;
                    else return (-1)
                } else if(b.currencyOut != null) {
                    if(a.currencyOut != null) return (a.currencyOut.localeCompare(b.currencyOut)) || (b.currencyOutAmmount - a.currencyOutAmmount) * localType;
                    else return 0;
                } else return 0
            }),
            sortValue: 'currencyOut',
            sortType: localType
        }
    ); 
}

export const sortInput = (setSort, array, type) => {
    let localType = 1;
    if(type != null){
        if(type.sortValue === 'currencyIn'){
            localType = -type.sortType;
        }
    }
    setSort(
        {
            sortedTransaction: array.toSorted((a,b)=>{
                if(b.currencyIn === null){
                    if(a.currencyIn === null) return 0;
                    else return (-1)
                } else if(b.currencyIn != null) {
                    if(a.currencyIn != null) return (a.currencyIn.localeCompare(b.currencyIn)) || (b.currencyInAmmount - a.currencyInAmmount) * localType;
                    else return 0;
                } else return 0
            }),
            sortValue: 'currencyIn',
            sortType: localType
        }
    ); 
}

export const sortRate = (setSort, array, type) => {
    let localType = 1;
    if(type != null){
        if(type.sortValue === 'rate'){
            localType = -type.sortType;
        }
    }
    setSort(
        {
            sortedTransaction: array.toSorted((a,b)=>{
                if(b.rate === null){
                    if(a.rate === null) return 0;
                    else return (-1)
                } else if(b.rate != null) {
                    if(a.rate != null) return (a.rate - b.rate) * localType;
                    else return 0;
                } else return 0
            }),
            sortValue: 'rate',
            sortType: localType
        }
    ); 
}

export const sortCashier = (setSort, array, type) => {
    let localType = 1;
    if(type != null){
        if(type.sortValue === 'cashier'){
            localType = -type.sortType;
        }
    }
    setSort(
        {sortedTransaction: array.toSorted((a,b)=>{
            if(a.cashier < b.cashier){
                return 1 * localType
            } else if(a.cashier > b.cashier){
                return -1 * localType
            } else return 0
        }),
        sortValue: 'cashier',
        sortType: localType}
    ); 
}

export const sortDateTime = (setSort, array, type) => {
    let localType = 1;
    if(type != null){
        if(type.sortValue === 'dateTime'){
            localType = -type.sortType;
        }
    }
    setSort(
        {sortedTransaction: array.toSorted((a,b)=>{
            if(a.date < b.date){
                return 1 * localType
            } else if(a.date > b.date){
                return -1 * localType
            } else return 0
        }),
        sortValue: 'dateTime',
        sortType: localType}
    ); 
}

export const sortType = (setSort, array, type) => {
    let localType = 1;
    if(type != null){
        if(type.sortValue === 'type'){
            localType = -type.sortType;
        }
    }
    setSort(
        {sortedTransaction: array.toSorted((a,b)=>{
            if(a.type < b.type){
                return 1 * localType
            } else if(a.type > b.type){
                return -1 * localType
            } else return 0
        }),
        sortValue: 'type',
        sortType: localType}
    ); 
}

export const sortID = (setSort, array, type) => {
    let localType = 1;
    if(type != null){
        if(type.sortValue === 'id'){
            localType = -type.sortType;
        }
    }
    setSort(
        {sortedTransaction: array.toSorted((a,b)=>{
            if(a._id < b._id){
                return 1 * localType
            } else if(a._id > b._id){
                return -1 * localType
            } else return 0
        }),
        sortValue: 'id',
        sortType: localType}
    ); 
}