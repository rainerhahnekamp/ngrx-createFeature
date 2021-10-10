import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from '../customer';
import { customerFeatureKey, State } from './customer.reducer';

const selectCustomerState = createFeatureSelector<State>(customerFeatureKey);

// property selectors
const selectLoadStatus = createSelector(
  selectCustomerState,
  (state) => state.loadStatus
);

const selectCustomer = createSelector(
  selectCustomerState,
  (state) => state.customers
);

const selectCountries = createSelector(
  selectCustomerState,
  (state) => state.countries
);

const selectCustomerGroups = createSelector(
  selectCustomerState,
  (state) => state.customerGroups
);

const selectHasError = createSelector(
  selectCustomerState,
  (state) => state.hasError
);

const selectSelectedCustomerId = createSelector(
  selectCustomerState,
  (state) => state.selectedCustomerId
);

// derived selector
const selectById = (id: number) =>
  createSelector(selectCustomer, (state: Customer[]) =>
    state.find((p) => p.id === id)
  );

const isLoaded = createSelector(
  selectLoadStatus,
  (loadStatus) => loadStatus === 'LOADED'
);

// export
export const fromCustomer = {
  selectAll: selectCustomer,
  selectById,
  selectLoadStatus,
  isLoaded,
};
