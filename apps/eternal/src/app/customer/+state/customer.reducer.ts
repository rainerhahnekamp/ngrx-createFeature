import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {createFeature, createReducer, on} from "@ngrx/store";
import {Customer} from "../customer";
import {CustomerGroup} from "../customer-group";
import {CustomerActions} from "./customer.actions";

export interface CustomerState extends EntityState<Customer> {
  loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  countries: string[];
  customerGroups: CustomerGroup[];
  hasError: boolean;
  selectedCustomerId: number;
  foobar: string;
}

export const adapter = createEntityAdapter<Customer>();

export const initialState: CustomerState = adapter.getInitialState({
  loadStatus: 'NOT_LOADED',
  countries: [],
  customerGroups: [],
  hasError: false,
  selectedCustomerId: 0,
  foobar: 'something',
});

export const customerFeature = createFeature({
  name: 'Customer',
  reducer: createReducer<CustomerState>(
    initialState,
    on(CustomerActions.load, (state) =>
       ({
        ...state,
        loadStatus: "LOADING",
      })
    ),
    on(CustomerActions.loaded, (state, { customers }) => ({
        ...adapter.setAll(customers, state),
        loadStatus: "LOADED"
    })),
    on(CustomerActions.added, CustomerActions.updated, CustomerActions.removed, (state, { customers }) => adapter.setAll(customers, state)),
  ),
});
