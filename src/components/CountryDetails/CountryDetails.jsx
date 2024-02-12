import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CountryDetails.css'

export default function CountryDetails() {
    const [country, setCountry] = useState(null);
    const { countryName } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then(response => {
                // Assumant que la réponse contient au moins un pays
                setCountry(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching country details:', error);
            });
    }, [countryName]);

    if (!country) return <p>Loading...</p>;

    // Formatage des monnaies
    const currencies = Object.values(country.currencies).map(currency => currency.name).join(', ');

    // Formatage des langues
    const languages = Object.values(country.languages).join(', ');

    // Formatage des pays frontaliers (si disponibles)
    const borders = country.borders?.join(', ') || 'None';

    return (
        <div>
            <div className='back-btn'>
            <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className='detail-item' >
                <div>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '450px', height: '250px' }}/>
                </div>
                <div>
                    <h1>{country.name.common}</h1>
                    <p>Native Name: {country.name.official}</p>
                    <p>Population: {country.population.toLocaleString()}</p>
                    <p>Region: {country.region}</p>
                    <p>Sub Region: {country.subregion}</p>
                    <p>Capital: {country.capital?.join(', ')}</p>
                    <p className='border'>Border Countries: {borders}</p>
                </div>
                <div className='column2' >
                    <p>Top Level Domain: {country.tld?.join(', ')}</p>
                    <p>Currencies: {currencies}</p>
                    <p>Languages: {languages}</p>
                </div>
            </div>
            
            
        </div>
    );
}
