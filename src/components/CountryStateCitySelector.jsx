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

  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

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
    try {
      const countriesResponse = await getAllCountries();
      setCountries(countriesResponse);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setCountries([]);
    }
  };

  const fetchStates = async () => {
    if (selectedCountry) {
      try {
        const statesResponse = await getStatesOfSelectedCountry(selectedCountry);
        setStates(statesResponse);
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]);
      }
    } else {
      setStates([]);
    }
    setSelectedState('');
    setSelectedCity('');
  };

  const fetchCities = async () => {
    if (selectedState) {
      try {
        const citiesResponse = await getCitiesOfSelectedState(selectedCountry, selectedState);
        setCities(citiesResponse);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      }
    } else {
      setCities([]);
    }
    setSelectedCity('');
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setShouldDisplayMessage(false);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setShouldDisplayMessage(false);
  };

  const handleCityChange = (event) => {
    const selectedCityValue = event.target.value;
    setSelectedCity(selectedCityValue);
    if (selectedCountry && selectedState && selectedCityValue) {
      setShouldDisplayMessage(true);
    } else {
      setShouldDisplayMessage(false);
    }
  };

  return (
    <div>
      <h1>Select Location</h1>
      <div className="container">
        <Select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          disabled={false}
          placeholder="Select Country"
          options={countries || []}
        />
        <Select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
          placeholder="Select State"
          options={states || []}
        />
        <Select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
          placeholder="Select City"
          options={cities || []}
        />
      </div>
      {shouldDisplayMessage && (
        <div>
          <span style={{ color: 'black' }}>You selected</span> <span style={{ color: 'black', fontSize: '30px' }}>{selectedCity}</span>, {selectedState}, <span>{selectedCountry}</span>
        </div>
      )}
    </div>
  );
};

export default CountryStateCitySelector;
