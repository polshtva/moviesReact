import { createStore, combineReducers } from 'redux';

const initialState = {
  favoriteMovies: [],
  watchLaterMovies: []
};

const favoriteMoviesReducer = (state = initialState.favoriteMovies, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return state.some(movie => movie.id === action.payload.id)
        ? state.filter(movie => movie.id !== action.payload.id)
        : [...state, action.payload];
    default:
      return state;
  }
};

const watchLaterMoviesReducer = (state = initialState.watchLaterMovies, action) => {
  switch (action.type) {
    case 'TOGGLE_WATCH_LATER':
      return state.some(movie => movie.id === action.payload.id)
        ? state.filter(movie => movie.id !== action.payload.id)
        : [...state, action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  favoriteMovies: favoriteMoviesReducer,
  watchLaterMovies: watchLaterMoviesReducer
});

const store = createStore(rootReducer);

export default store;
