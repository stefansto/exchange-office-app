## Exchange office application

Application meant to be used by cashiers in an exchange office.

## Project Specification

- Login form checked with regular expressions and a POST request is sent to the API
- Header with functional links that open their respectful modal and a logout button
- Input and Output link used for putting in and taking out money from the cash register
- Exchange link used for exchanging user specified ammount of one currency to another with a specified rate
- Input, Output and Exchange forms send a PUT request to the API
- Display of currencies and their ammount meant to represent money in stock
- Table of successful transactions
- Footer that displays currently logged in worker
- Currency and Transaction data is fetched from the API using a GET request

## Backend Repository

- https://github.com/stefansto/exchange-office-api

## Notes

- Put your url for the API in 'API_URL' const in 'App.jsx'