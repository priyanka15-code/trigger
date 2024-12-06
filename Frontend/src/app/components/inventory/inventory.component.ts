import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  inventory: any[] = [];
  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.loadinventory();
  }

  loadinventory(): void {
    this.service.getinventory().subscribe((data) => {
      this.inventory = data;
    });
  }

  deleteInventory(id: string): void {
    this.service.deleteinventory(id).subscribe(
      () => {
        console.log('Customer deleted');
        this.loadinventory();
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }
}
