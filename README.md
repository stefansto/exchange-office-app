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
- Sorting transactions in ascending or descending order done locally by clicking the table header of the column by which you want to sort data
- Filtering transactions by sending selected parameters to the API and displaying the data recieved back
- Admin Panel for users that have the admin role where admins can:
    - Add a new user
    - Edit existing users

## Backend Repository

- https://github.com/stefansto/exchange-office-api

## Usage

- Clone the repository and run `npm install`
- Make a `.env` file in root, there is an example file of it in the repository
- Need to have the API from the backend repository running
- Put the url for the API in `VITE_EXCHANGE_APP_API_URL` variable in the `.env` file
- Start the app with `npm run dev`