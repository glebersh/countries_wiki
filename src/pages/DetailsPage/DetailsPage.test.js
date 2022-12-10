import { render, screen } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Details } from './DetailsPage';
import * as useParams from 'react-router-dom';
import { Button } from '../../components/Button';
import * as useDetails from '../../features/details/useDetails';
import { useNeighbors } from '../../features/details/useNeighbors';

const country = {
  currentCountry: {
    name: 'Brazil',
    topLevelDomain: [
      '.br'
    ],
    alpha2Code: 'BR',
    alpha3Code: 'BRA',
    callingCodes: [
      '55'
    ],
    capital: 'Brasília',
    altSpellings: [
      'BR',
      'Brasil',
      'Federative Republic of Brazil',
      'República Federativa do Brasil'
    ],
    subregion: 'South America',
    region: 'Americas',
    population: 212559409,
    latlng: [
      -10,
      -55
    ],
    demonym: 'Brazilian',
    area: 8515767,
    gini: 53.4,
    timezones: [
      'UTC-05:00',
      'UTC-04:00',
      'UTC-03:00',
      'UTC-02:00'
    ],
    borders: [
      'ARG',
      'BOL',
      'COL',
      'FRA',
      'GUF',
      'GUY',
      'PRY',
      'PER',
      'SUR',
      'URY',
      'VEN'
    ],
    nativeName: 'Brasil',
    numericCode: '076',
    flags: {
      svg: 'https://flagcdn.com/br.svg',
      png: 'https://flagcdn.com/w320/br.png'
    },
    currencies: [
      {
        code: 'BRL',
        name: 'Brazilian real',
        symbol: 'R$'
      }
    ],
    languages: [
      {
        iso639_1: 'pt',
        iso639_2: 'por',
        name: 'Portuguese',
        nativeName: 'Português'
      }
    ],
    translations: {
      br: 'Brazil',
      pt: 'Brasil',
      nl: 'Brazilië',
      hr: 'Brazil',
      fa: 'برزیل',
      de: 'Brasilien',
      es: 'Brasil',
      fr: 'Brésil',
      ja: 'ブラジル',
      it: 'Brasile',
      hu: 'Brazília'
    },
    flag: 'https://flagcdn.com/br.svg',
    regionalBlocs: [
      {
        acronym: 'USAN',
        name: 'Union of South American Nations',
        otherAcronyms: [
          'UNASUR',
          'UNASUL',
          'UZAN'
        ],
        otherNames: [
          'Unión de Naciones Suramericanas',
          'União de Nações Sul-Americanas',
          'Unie van Zuid-Amerikaanse Naties',
          'South American Union'
        ]
      }
    ],
    cioc: 'BRA',
    independent: true
  }
};


jest.mock('../../features/details/useNeighbors', () => ({
  useNeighbors: () => ['Columbia', 'Argentina', 'Peru'],
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../features/details/useDetails');
const mockUseDetails = jest.spyOn(useDetails, 'useDetails');

jest.mock('react-router-dom');
const mockUseParams = jest.spyOn(useParams, 'useParams');

jest.mock('react-redux');
const mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockUseSelector = jest.spyOn(reduxHooks, 'useSelector');


describe('DetailsPage component', () => {
  it('DetailsPage renders', () => {
    mockUseDispatch.mockReturnValue(jest.fn());
    mockUseParams.mockReturnValue('Brazil');
    mockUseDetails.mockReturnValue({ currentCountry: country, error: null, status: 'idle' });

    render(<BrowserRouter>
      <Details />
    </BrowserRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('DetailsPage navigate button trigger', () => {
    mockUseDispatch.mockReturnValue(jest.fn());
    mockUseParams.mockReturnValue('Brazil');
    mockUseDetails.mockReturnValue({ currentCountry: country, error: null, status: 'idle' });

    render(<BrowserRouter>
      <Details />
    </BrowserRouter>);
    userEvent.click(screen.getByRole('button'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });
});
