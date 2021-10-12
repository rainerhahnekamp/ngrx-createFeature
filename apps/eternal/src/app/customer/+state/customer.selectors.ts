import { createSelector } from '@ngrx/store';
import { Customer } from '../customer';
import { customerFeature } from './customer.reducer';

const {
  selectCustomers,
  selectLoadStatus,
  selectCountries,
  selectCustomerGroups,
  selectHasError,
  selectSelectedCustomerId,
} = customerFeature;

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
