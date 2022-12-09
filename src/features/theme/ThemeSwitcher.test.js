import { render, screen } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Header } from '../../components/Header/Header';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useTheme } from './useTheme';


jest.mock('react-redux');
const mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockUseSelector = jest.spyOn(reduxHooks, 'useSelector');

const mockToggleTheme = jest.fn();

jest.mock('./useTheme', () => ({
  useTheme: () => ['Dark', mockToggleTheme],
}));


describe('ThemeSwitcher component', () => {
  it('Header Link renders', () => {
    mockUseDispatch.mockReturnValue(jest.fn());

    render(<BrowserRouter>
      <Header />
    </BrowserRouter>);
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });

  it('ThemeSwitcher click', () => {
    const dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);

    render(<BrowserRouter>
      <Header />
    </BrowserRouter>);
    userEvent.click(screen.getByTestId('theme-switcher'));

    expect(mockToggleTheme).toHaveBeenCalled();
    expect(screen.getByTestId('theme-switcher')).toHaveTextContent('Dark Theme');
  });
});
