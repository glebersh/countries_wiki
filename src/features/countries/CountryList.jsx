import React from 'react'

import { useNavigate } from 'react-router-dom';

import { List } from '../../components/List';
import { Card } from '../../components/Card/Card';
import { useCountries } from './useCountries';

const CountriesList = () => {
  const navigate = useNavigate();

  const [countries, { error, status }] = useCountries();
  return (
    <div data-testid='countries-list-container'>
      {error && <h2 data-testid='error-header'>Can't fetch data</h2>}
      {status === 'loading' && <h2 data-testid='loading-header'>Loading...</h2>}

      {status === 'received' && (
        <List>
          {countries.map((country) => {
            const countryInfo = {
              img: country.flags.png,
              name: country.name,
              info: [
                {
                  title: 'Population',
                  description: country.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: country.region,
                },
                {
                  title: 'Capital',
                  description: country.capital,
                },
              ],
            };

            return (
              <Card
                key={country.name}
                onClick={() => navigate(`country/${country.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </div>
  )
};
export default CountriesList;

