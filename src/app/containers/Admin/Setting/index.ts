// Redux
export {
  actions as settingsActions,
  reducer as settingsReducer,
  // modalDataKeys as equipmentsModalDataKeys,
} from './redux/slice';
export { settingsSelectors } from './redux/selectors';
export { settingsApi } from './api';
export { settingsHooks } from './hooks';
export { TagSeo } from './components/TagSeo';
export { Information } from './components/Information';
export { EmailTemplateTable } from './components/EmailTemplate/components/EmailTemplateTable';
export { EmailTemplateAdding } from './components/EmailTemplate/components/EmailTemplateDetail/components/Adding';
export { EmailTemplateUpdating } from './components/EmailTemplate/components/EmailTemplateDetail/components/Updating';

export { SkuTable } from './components/Sku/components/SkuTable';
export { SkuAdding } from './components/Sku/components/SkuDetail/components/Adding';
export { SkuUpdating } from './components/Sku/components/SkuDetail/components/Updating';

export { RoutePathTable } from './components/RoutePath/components/RoutePathTable';
export { RoutePathAdding } from './components/RoutePath/components/RoutePathDetail/components/Adding';
export { RoutePathUpdating } from './components/RoutePath/components/RoutePathDetail/components/Updating';


