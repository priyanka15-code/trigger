import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  editingCustomer: any | null = null;

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.loadcustomer();
    this.service.getInventoryUpdates().subscribe(message => {
      console.log('Received from WebSocket:', message);
      if (message && typeof message === 'object' && 'message' in message && message.message === 'Loyalty points updated successfully.') {
        alert(message.message);
        this.loadcustomer(); 
      }
    });
  }

  loadcustomer(): void {
    this.service.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  startEditCustomer(customer: any) {
    this.editingCustomer = { ...customer };
  }

  submitCustomerForm(): void {
    if (this.editingCustomer?._id) {
      this.service.updateCustomer(this.editingCustomer._id, this.editingCustomer).subscribe(
        (updatedCustomer) => {
          console.log('Customer updated:', updatedCustomer);
          this.loadcustomer();
          this.editingCustomer = null;
        },
        (error) => {
          console.error('Error updating customer:', error);
        }
      );
    }
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