import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function fetchCountries() {
  return axios.get(`${apiUrl}/countries/available`);
}

function fetchCountry(countryCode) {
  return axios.get(`${apiUrl}/countries/${countryCode}`);
}

export { fetchCountries, fetchCountry };
