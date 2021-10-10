import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromCustomer } from '../+state/customer.selectors';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  customers$ = this.store.select(fromCustomer.selectCustomers);

  constructor(private store: Store) {}
}
