import { render, screen } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const countryInfo = {
  img: 'https://via.placeholder.com/300.png',
  name: 'Brasil',
  info: [
    {
      title: 'Population',
      description: 214047375
    },
    {
      title: 'Region',
      description: 'Latin Amerika',
    },
    {
      title: 'Capital',
      description: 'Brasília ',
    },
  ],
};

describe('Card component', () => {
  it('Card renders', () => {
    render(<Card {...countryInfo} />)

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Brasil');
    expect(screen.getByRole('img')).toHaveAttribute('src', countryInfo.img);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('Card snapshot', () => {
    const countryCard = render(<Card {...countryInfo} />);
    expect(countryCard).toMatchSnapshot();
  });

  it('Navigate to DetailsPage', () => {
    const navigate = useNavigate();
    render(<Card {...countryInfo} onClick={() => navigate(`country/${countryInfo.name}`)} />);
    userEvent.click(screen.getByRole('article'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('country/Brasil');
  });
});
