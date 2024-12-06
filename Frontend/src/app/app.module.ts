import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { CustomersComponent } from './components/customers/customers.component';
import { HttpClientModule } from '@angular/common/http';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SalesComponent } from './components/sales/sales.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    InventoryComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
