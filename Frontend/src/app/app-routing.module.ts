import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'sales', component: SalesComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: '**', redirectTo: '/customers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
