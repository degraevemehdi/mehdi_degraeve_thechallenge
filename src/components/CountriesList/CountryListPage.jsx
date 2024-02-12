import './CountryListPage.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from '../SearchComponent/SearchComponent';
import CountryDetails from '../CountryDetails/CountryDetails';
import { useNavigate } from 'react-router-dom';


function CountryListPage() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const handleCountryClick = (countryName) => {
        navigate(`/${countryName}`);
    };
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
            setCountries(response.data);
            setFilteredCountries(response.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);
    const handleSearch = (searchTerm) => {
        const filtered = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
    };
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        if (event.target.value === '') {
            setFilteredCountries(countries);
        } else {
            setFilteredCountries(countries.filter(country => country.region === event.target.value));
        }
    };
    return (
        <div>
            <div className='filter'>
                <SearchComponent  onSearch= {handleSearch}/>
                <div className='select'>
                    <select value={selectedRegion} onChange={handleRegionChange}>
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    </select>
                </div>

            </div>
            <div  className='countries'>
                {filteredCountries.map(country => (
                    <div className='country' key={country.cca3} onClick={() => handleCountryClick(country.name.common)}>
                        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="50" height="30" />
                        <h2>{country.name.common}</h2>
                        <p>Population: {country.population.toLocaleString()}</p>
                        <p>Region: {country.region}</p>
                        <p>Capital: {country.capital ? country.capital[0] : 'No capital'}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CountryListPage;
