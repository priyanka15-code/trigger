import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  inventory: any[] = [];
  toastMessages: { message: string }[] = [];
  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.loadinventory();
    this.listenForUpdates();
  }

  loadinventory(): void {
    this.service.getinventory().subscribe((data) => {
      this.inventory = data;
    });
  }


  listenForUpdates(): void {
    this.service.getInventoryUpdates().subscribe((change: any) => {
      console.log('Real-time update:', change);
      let toastMessage = '';

      switch (change.operationType) {
        case 'insert':
          this.inventory.push(change.fullDocument);
          toastMessage = `New item added: ${change.fullDocument.name}`;
          break;
        case 'update':
          const updatedItem = this.inventory.find(
            (item) => item._id === change.documentKey._id
          );
          if (updatedItem) {
            Object.assign(
              updatedItem,
              change.updateDescription.updatedFields
            );
            toastMessage = `Item updated: ${updatedItem.name}`;
          }
          break;
        case 'delete':
          this.inventory = this.inventory.filter(
            (item) => item._id !== change.documentKey._id
          );
          toastMessage = `Item deleted`;
          break;
      }

      if (toastMessage) {
        this.showToast(toastMessage);
      }
    });
  }

  showToast(message: string): void {
    this.toastMessages.push({ message });

   
    setTimeout(() => {
      this.toastMessages.shift();
    }, 5000);
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
