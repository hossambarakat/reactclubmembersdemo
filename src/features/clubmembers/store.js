import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});

export const createClubMembersStore = () => (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);
const store = createClubMembersStore();

export default store;
