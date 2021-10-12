import { createFeature, createReducer, on } from '@ngrx/store';
import { Customer } from '../customer';
import { CustomerGroup } from '../customer-group';
import { CustomerActions } from './customer.actions';

export interface State {
  loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  customers: Customer[];
  countries: string[];
  customerGroups: CustomerGroup[];
  hasError: boolean;
  selectedCustomerId: number;
  foobar: string;
}

export const initialState: State = {
  loadStatus: 'NOT_LOADED',
  customers: [],
  countries: [],
  customerGroups: [],
  hasError: false,
  selectedCustomerId: 0,
  foobar: 'something',
};

export const customerFeature = createFeature({
  name: 'Customer',
  reducer: createReducer<State>(
    initialState,
    on(CustomerActions.load, (state) => ({
      ...state,
      loadStatus: 'LOADING',
    })),
    on(CustomerActions.loaded, (state, { customers }) => ({
      ...state,
      loadStatus: 'LOADED',
      customers,
    })),
    on(CustomerActions.added, (state, { customers }) => ({
      ...state,
      customers,
    })),
    on(CustomerActions.updated, (state, { customers }) => ({
      ...state,
      customers,
    })),
    on(CustomerActions.removed, (state, { customers }) => ({
      ...state,
      customers,
    }))
  ),
});
