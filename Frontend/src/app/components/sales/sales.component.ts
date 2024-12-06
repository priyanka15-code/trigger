import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  sales: any[] = [];

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.loadSales(); // Call the corrected method
  }

  // Corrected method name and assignment
  loadSales(): void {
    this.service.getsales().subscribe(
      (data) => {
        this.sales = data || []; 
      },
      (error) => {
        console.error('Error loading sales:', error); 
      }
    );
  }

  deletesales(id: string): void {
    this.service.deletesales(id).subscribe(
      () => {
        console.log('Sales deleted');
        this.loadSales(); 
      },
      (error) => {
        console.error('Error deleting sale:', error); 
      }
    );
  }
}
