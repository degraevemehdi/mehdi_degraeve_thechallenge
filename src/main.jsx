import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import CountryDetails from './components/CountryDetails/CountryDetails'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import CountriesList from './components/CountriesList/CountryListPage'

import './index.css'
const router = createBrowserRouter([
  {
    path : '/',
    element : <Root />,
    children : [
      {
        path : '',
        element : <CountriesList />
      },
      {
        path : ':countryName',
        element : <CountryDetails />
      }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
