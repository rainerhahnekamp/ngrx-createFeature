import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from '../customer';
import { CustomerGroup } from '../customer-group';
import { CustomerActions } from './customer.actions';

export const customerFeatureKey = 'Customer';

export interface State {
  loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  customers: Customer[];
  countries: string[];
  customerGroups: CustomerGroup[];
  hasError: boolean;
  selectedCustomerId: number;
}

export interface CustomerAppState {
  [customerFeatureKey]: State;
}

export const initialState: State = {
  loadStatus: 'NOT_LOADED',
  customers: [],
  countries: [],
  customerGroups: [],
  hasError: false,
  selectedCustomerId: 0,
};

const CustomerReducer = createReducer<State>(
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
);

export function reducer(state: State | undefined, action: Action) {
  return CustomerReducer(state, action);
}
