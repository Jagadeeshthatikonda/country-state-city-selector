import axios from "axios";

export const BACKEND_END_POINT = "https://crio-location-selector.onrender.com";

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BACKEND_END_POINT}/countries`);
    return response.data;
  } catch (error) {
    if (error.request) {
      console.log("Error fetching countries:Request made but no response is received from the server.");
    } else {
      console.log("Error fetching countries:Error occured while setting up the request");
    }
    return null;
  }
};

export const getStatesOfSelectedCountry = async (selectedCountry) => {
  try {
    const response = await axios.get(`${BACKEND_END_POINT}/country=${selectedCountry}/states`);
    return response.data;
  } catch (error) {
    if (error.request) {
      console.log("Error fetching states:Request made but no response is received from the server.");
    } else {
      console.log("Error fetching states:Error occured while setting up the request");
    }
    return null;
  }
};

export const getCitiesOfSelectedState = async (selectedCountry, selectedState) => {
  try {
    const response = await axios.get(`${BACKEND_END_POINT}/country=${selectedCountry}/state=${selectedState}/cities`);
    return response.data;
  } catch (error) {
    if (error.request) {
      console.log("Error fetching cities:Request made but no response is received from the server.");
    } else {
      console.log("Error fetching cities:Error occured while setting up the request");
    }
    return null;
  }
};
