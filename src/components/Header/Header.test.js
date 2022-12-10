import { fireEvent, render, screen } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


jest.mock('react-redux');
const mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockUseSelector = jest.spyOn(reduxHooks, 'useSelector');


describe('Header component', () => {
  it('Header Link renders', () => {
    mockUseDispatch.mockReturnValue(jest.fn());

    render(<BrowserRouter>
      <Header />
    </BrowserRouter>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Header snapshot', () => {
    const header = render(<BrowserRouter>
      <Header />
    </BrowserRouter>);
    expect(header).toMatchSnapshot();
  });

  it('Header Link dispatch triggering', () => {
    const dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);

    render(<BrowserRouter>
      <Header />
    </BrowserRouter>);
    userEvent.click(screen.getByRole('link'));
    expect(dispatch).toHaveBeenCalled();
  });
});
