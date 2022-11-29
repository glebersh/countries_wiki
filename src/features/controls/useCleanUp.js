import { useDispatch } from 'react-redux';
import { clearControls } from '../controls/controlsSlice';

export const useCleanUp = () => {
  const dispatch = useDispatch();

  const cleanUp = () => dispatch(clearControls());

  return () => dispatch(cleanUp());
};