import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.loadcustomer();
  }

  loadcustomer(): void {
    this.service.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  updateCustomer(id: string, customer: any): void {
    this.service.updateCustomer(id, customer).subscribe(
      (updatedCustomer) => {
        console.log('Customer updated:', updatedCustomer);
        this.loadcustomer();
      },
      (error) => {
        console.error('Error updating customer:', error);
      }
    );
  }
  deleteCustomer(id: string): void {
    this.service.deleteCustomer(id).subscribe(
      () => {
        console.log('Customer deleted');
        this.loadcustomer();
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }
}
