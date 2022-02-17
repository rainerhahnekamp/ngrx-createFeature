import { createSelector } from '@ngrx/store';
import { Customer } from '../customer';
import {adapter, customerFeature} from "./customer.reducer";

const {
  selectLoadStatus,
  selectCountries,
  selectCustomerGroups,
  selectHasError,
  selectSelectedCustomerId,
  selectCustomerState
} = customerFeature;

// selector from entityAdapter
const selectCustomers = createSelector(selectCustomerState, adapter.getSelectors().selectAll);

// derived selector
const selectById = (id: number) =>
  createSelector(selectCustomers, (state: Customer[]) =>
    state.find((p) => p.id === id)
  );

const isLoaded = createSelector(
  selectLoadStatus,
  (loadStatus) => loadStatus === 'LOADED'
);

// export
export const fromCustomer = {
  selectCustomers,
  selectLoadStatus,
  selectById,
  isLoaded,
};
