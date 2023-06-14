// Redux
export {
    actions as contactsActions,
    reducer as contactsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { contactsSelectors } from './redux/selectors';
  export { contactsApi } from './api';
  export { contactsHooks } from './hooks';
  export { ContactTable as AdminContactTable } from './components/ContactTable';
  export { ContactDetailForm as AdminContactDetailForm } from './components/ContactDetail/components/ContactDetailForm';
  export { ContactAdd as AdminContactAdd } from './components/ContactDetail/components/ContactAdd';
  export { ContactUpdate as AdminContactUpdate } from './components/ContactDetail/components/ContactUpdate';
