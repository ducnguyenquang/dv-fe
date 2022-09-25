// Redux
export {
    actions as advertisementsActions,
    reducer as advertisementsReducer,
    // modalDataKeys as equipmentsModalDataKeys,
  } from './redux/slice';
  export { advertisementsSelectors } from './redux/selectors';
  export { advertisementsApi } from './api';
  export { advertisementsHooks } from './hooks';
  export { AdvertisementTable as AdminAdvertisementTable } from './components/AdvertisementTable';
  export { AdvertisementDetailForm as AdminAdvertisementDetailForm } from './components/AdvertisementDetail/components/AdvertisementDetailForm';
  export { AdvertisementAdd as AdminAdvertisementAdd } from './components/AdvertisementDetail/components/AdvertisementAdd';
  export { AdvertisementUpdate as AdminAdvertisementUpdate } from './components/AdvertisementDetail/components/AdvertisementUpdate';
