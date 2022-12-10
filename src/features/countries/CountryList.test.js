import { render, screen, waitFor } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import * as countriesHook from './useCountries';
import CountriesList from './CountryList';


const countries = [{
  name: 'Bhutan',
  capital: 'Thimphu',
  region: 'Asia',
  population: 771612,
  flags: {
    svg: 'https://flagcdn.com/bt.svg',
    png: 'https://flagcdn.com/w320/bt.png'
  },
  independent: false
}, {
  name: 'Bolivia (Plurinational State of)',
  capital: 'Sucre',
  region: 'Americas',
  population: 11673029,
  flags: {
    svg: 'https://flagcdn.com/bo.svg',
    png: 'https://flagcdn.com/w320/bo.png'
  },
  independent: false
}]


jest.mock('./useCountries');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('List component', () => {
  it('List renders if loadingStatus = \'received\'', () => {
    jest.spyOn(countriesHook, 'useCountries').mockImplementation(() => [countries, { status: 'received', error: null, numberOfCountries: 2 }]);
    const list = render(<CountriesList />);
    expect(list.getByTestId('countries-list-container')).not.toBeEmptyDOMElement();
  });

  it('Info snapshot', () => {
    jest.spyOn(countriesHook, 'useCountries').mockImplementation(() => [countries, { status: 'received', error: null, numberOfCountries: 2 }]);
    const list = render(<CountriesList />);
    expect(list).toMatchSnapshot();
  });

  it('List not renders if loadingStatus = \'loading\'', () => {
    jest.spyOn(countriesHook, 'useCountries').mockImplementation(() => [countries, { status: 'loading', error: null, numberOfCountries: 2 }]);
    const list = render(<CountriesList />);
    expect(list.getByTestId('loading-header')).toHaveTextContent('Loading...');
  });


  it('List not renders if error', () => {
    jest.spyOn(countriesHook, 'useCountries').mockImplementation(() => [countries, { status: '', error: true, numberOfCountries: 2 }]);
    const list = render(<CountriesList />);
    expect(list.getByTestId('error-header')).toHaveTextContent('Can\'t fetch data');
  });
});
