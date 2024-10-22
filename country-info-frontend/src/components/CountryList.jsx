import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCountries } from "../utils/api";

function CountryList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries().then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Country List</h1>
      <div className="row">
        {countries.map((country) => (
          <div className="col-md-4 col-sm-6" key={country.countryCode}>
            {/* the country name is a link to the country page */}
            <div className="card mb-4">
              <Link to={`/country/${country.countryCode}`}>
                <div className="card-body">
                  <h5 className="card-title">{country.name}</h5>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
