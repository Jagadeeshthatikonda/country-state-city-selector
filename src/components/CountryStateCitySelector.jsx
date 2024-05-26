import React, { useState, useEffect } from 'react';
import { getAllCountries, getStatesOfSelectedCountry, getCitiesOfSelectedState } from '../apis/apis';
import "./styles.css";
import Select from './Dropdown';

const CountryStateCitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates();
    // eslint-disable-next-line
  }, [selectedCountry]);

  useEffect(() => {
    fetchCities();
    // eslint-disable-next-line
  }, [selectedState]);

  const fetchCountries = async () => {
    const countriesResponse = await getAllCountries();
    setCountries(countriesResponse);

  };

  const fetchStates = async () => {
    if (selectedCountry) {

      const statesResponse = await getStatesOfSelectedCountry(selectedCountry);
      setStates(statesResponse);

    } else {
      setStates([]);
    }
    setSelectedState('');
    setSelectedCity('');
  };

  const fetchCities = async () => {
    if (selectedState) {

      const citiesResponse = await getCitiesOfSelectedState(selectedCountry, selectedState);
      setCities(citiesResponse);

    } else {
      setCities([]);
    }
    setSelectedCity('');
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCountry && selectedState && selectedCity) {
      setMessage(`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`);
    } else {
      setMessage('Please select all fields');
    }
  };

  return (
    <div>
      <h1>Select Location</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <Select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            disabled={false}
            placeholder="Select Country"
            options={countries}
          />
          <Select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
            placeholder="Select State"
            options={states}
          />
          <Select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
            placeholder="Select City"
            options={cities}
          />
          <button type="submit" disabled={!selectedCity}>Submit</button>
        </div>
      </form>
      {message && (
        <h2>
          <span style={{ color: 'black' }}>You Selected</span> <span style={{ color: 'black', fontSize: '30px' }}>{selectedCity}</span>, {selectedState}, <span>{selectedCountry}</span>
        </h2>
      )}
    </div>
  );
};

export default CountryStateCitySelector;
