import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

import { fetchCountry } from "../utils/api";

function CountryInfo() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetchCountry(countryCode).then((response) => {
      setCountry(response.data);
    });
  }, [countryCode]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="country-info">
        <h1>{country.commonName}</h1>
        <img src={country.flagUrl} alt={`${country.commonName} flag`} />
      </div>

      {/* More info here */}
      <div className="country-info">
        <p>Official name: {country.officialName}</p>
        <p>Common name: {country.commonName}</p>

        <p>Region: {country.region}</p>
        <p>
          Population:{" "}
          {country.populationData[country.populationData.length - 1].value}
        </p>

        {/* Border countries list */}
        <div className="list-group-item">
          <h2>Border countries:</h2>
          <ul>
            {country.borders.map((border) => (
              <li key={border.countryCode}>
                <Link
                  className="link-no-decoration"
                  to={`/country/${border.countryCode}`}
                >
                  {border.officialName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Population chart */}
      <div className="country-info-chart mx-auto">
        <h2>Population chart:</h2>

        <LineChart
          width={600}
          height={300}
          data={country.populationData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3498db"
            name="Population"
          />
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>

      {/* Back to home link */}
      <div className="country-info">
        <Link className="link-no-decoration" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default CountryInfo;
