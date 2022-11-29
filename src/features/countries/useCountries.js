import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { selectControls } from '../controls/controlsSlice';
import {
  selectCountriesInfo,
  selectVisibleCountries,
  loadCountries
} from './countriesSlice';

export const useCountries = () => {

  const { search, region } = useSelector(selectControls);
  const countries = useSelector(state => selectVisibleCountries(state,
    { search, region }));
  const dispatch = useDispatch();

  const { status, error, numberOfCountries } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!numberOfCountries) {
      dispatch(loadCountries());
    }
  }, [numberOfCountries, dispatch]);

  return [countries, { status, error, numberOfCountries }];
};

