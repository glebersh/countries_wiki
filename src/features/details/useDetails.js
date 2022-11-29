
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDetails, clearDetails, loadCountryByName } from './detailsSlice';


export const useDetails = (name) => {
  const dispatch = useDispatch();
  const { currentCountry, error, status } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));
    return () => {
      dispatch(clearDetails());
    }
  }, [name, dispatch]);

  return { currentCountry, error, status };
};