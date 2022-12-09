import { render, screen } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Info } from './Info';
import { useNeighbors } from './useNeighbors';
import * as reduxHooks from 'react-redux';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('./useNeighbors', () => ({
  useNeighbors: () => ['Columbia', 'Argentina', 'Peru'],
}));

const data = {
  name: 'Brasil',
  nativeName: 'Brasil',
  flag: 'https://via.placeholder.com/300.png',
  capital: 'Brasilia',
  population: 214047375,
  region: 'Amerika',
  subregion: 'Latin Amerika',
  topLevelDomain: ['.br'],
  currencies: [{
    code: 'BRL',
    name: 'Brazilian real',
    symbol: 'R$'
  }],
  languages: [{
    iso639_1: 'pt',
    iso639_2: 'por',
    name: 'Portuguese',
    nativeName: 'Português'
  }],
  borders: ['Columbia', 'Argentina', 'Peru'],
  push: mockedUsedNavigate,
};

describe('Info component', () => {
  it('Info renders', () => {
    render(<Info {...data} />)
    expect(screen.getByTestId('country-info')).toBeInTheDocument();
  });

  it('Info snapshot', () => {
    const countryInfo = render(<Info {...data} />);
    expect(countryInfo).toMatchSnapshot();
  });

  it('Info neighbors navigate', () => {
    render(<Info {...data} />);
    userEvent.click(screen.getByText('Columbia'));
    expect(screen.getByText('Columbia')).toBeInTheDocument();
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/countries_wiki/country/Columbia');
  });
});