import { combineReducers } from '@reduxjs/toolkit';

import { productsReducer } from 'app/containers/Product';
// import { reducer as authCognitoReducer } from 'Components/AuthCognito/redux/slice';
// import { reducer as messengerReducer } from 'Components/Messenger/redux/slice';
// import { reducer as usersReducer } from 'Components/Users/redux/slice';
// import { reducer as customersReducer } from 'Components/Customers/redux/slice';
// import { reducer as equipmentsReducer } from 'Components/Equipments/redux/slice';
// import { reducer as locationReducer } from 'Components/Locations/redux/slice';
// import { reducer as calendarReducer } from 'Components/Calendar/redux/slice';
// import { reducer as absencesReducer } from 'Components/Absences/redux/slice';
// import { reducer as taskAndRoomtypesReducer } from 'Components/TasksAndRoomtypes/redux/slice';
// import { reducer as roombookReducer } from 'Components/Roombook/redux/slice';
// import { reducer as mvpReducer } from 'Components/Commons/redux/slice';
// import { reducer as languageReducer } from 'I18n/redux/slice';

// import { queryClient } from 'Components/App/App';

// If reducer needs to be available throughout the app you need to add it here
const createReducer = (injectedReducers = {}): any => {
  const appReducer = combineReducers({
    product: productsReducer,
    ...injectedReducers,
  });

  const rootReducer = (state: any, action: any) => {
    // if (action.type === 'authCognito/logout/fulfilled') {
    //   queryClient.removeQueries();
    //   return appReducer(undefined, action);
    // }
    return appReducer(state, action);
  };

  return rootReducer;
};

export default createReducer;
