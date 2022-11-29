import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSearch, selectSearch } from "./controlsSlice";

export const useSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value))
  }
  return [search, handleSearch];
};