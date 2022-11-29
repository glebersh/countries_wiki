import axios from "axios";
import * as API from './config';
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import themeReducer from './features/theme/themeSlice';
import controlsReducer from './features/controls/controlsSlice';
import { countryReducer } from "./features/countries/countriesSlice";
import detailsReducer from './features/details/detailsSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: countryReducer,
    details: detailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        client: axios,
        API,
      },
    },
    serializableCheck: false,
  })
});