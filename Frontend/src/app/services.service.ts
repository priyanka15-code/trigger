import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:3000/api';
  private socket$ = new WebSocketSubject('ws://localhost:3001');

  constructor(private http: HttpClient) { }


  getInventoryUpdates() {
    return this.socket$; 
}
 // customer api
  getCustomers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/customers`)
  }

  addCustomer(customer: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/customers`,customer)
  }

  updateCustomer(id: string, customer:any ): Observable<any>{
    return this.http.put(`${this.apiUrl}/customers/${id}`,customer)
  }

  deleteCustomer(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/customers/${id}`)
  }

  //inventory api

  getinventory(): Observable<any>{
    return this.http.get(`${this.apiUrl}/inventory`)
  }

  addinventory(inventory: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/inventory`,inventory)
  }

  updateinventory(id: string, inventory: any ): Observable<any>{
    return this.http.put(`${this.apiUrl}/inventory/${id}`,inventory)
  }

  deleteinventory(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/inventory/${id}`)
  }

  // sales api

  getsales():Observable<any>{
    return this.http.get(`${this.apiUrl}/sales`)
  }

  addsales(sales: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/sales`,sales)
  }

  updatesales(id: string, sales: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/sales/${id}`,sales)
  }

  deletesales(id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/sales/${id}`)
  }
}
